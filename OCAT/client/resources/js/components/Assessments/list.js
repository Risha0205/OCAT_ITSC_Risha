import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useTable, useSortBy, useFilters } from 'react-table';

//Used this https://github.com/tannerlinsley/react-table/tree/master/examples/sorting as a resource for my code for the table sorting.
//Used this https://www.youtube.com/watch?v=2U9eVClAqh0 as a resource for my code for the table filtering.

export function AssessmentList() {

    const [columnsArray, setColumnsArray] = useState([]);

    useEffect(function fetch() {
        (async function () {
            const resData = await AssessmentService.retrieveAll();
            const columnedData = []
            resData.data.forEach(assessment => {

                let dateOfBirth = Date.parse(assessment.cat_date_of_birth);
                dateOfBirth = new Date(dateOfBirth);
                dateOfBirth = dateOfBirth.toLocaleDateString("en-US");

                let createdAt = Date.parse(assessment.created_at);
                createdAt = new Date(createdAt);
                createdAt = createdAt.toLocaleString("en-US");

                columnedData.push(
                    {
                        column1: assessment.cat_name,
                        column2: dateOfBirth,
                        column3: assessment.instrument,
                        column4: assessment.risk_level,
                        column5: assessment.score + '',
                        column6: createdAt,
                    })
            });
            setColumnsArray(columnedData);
        })();
    }, []);

    const tableColumns = createTableColumns();
    const tableData = createTableDate();
    const table = createTable(tableColumns, tableData);
    const alternativeDisplay = createAlternativeDisplay();

    let display = columnsArray.length > 0 ? table : alternativeDisplay;

    return display;

    function createTableColumns() {
        const columns = React.useMemo(
            () => [
                {
                    Header: 'Name',
                    accessor: 'column1',
                    sortType: 'basic',
                    Filter: columnFilter
                },
                {
                    Header: 'Date of Birth',
                    accessor: 'column2',
                    sortType: 'basic',
                    Filter: columnFilter
                },
                {
                    Header: 'Instrument',
                    accessor: 'column3',
                    sortType: 'basic',
                    Filter: columnFilter
                },
                {
                    Header: 'Risk Level',
                    accessor: 'column4',
                    sortType: 'basic',
                    Filter: columnFilter
                },
                {
                    Header: 'Score',
                    accessor: 'column5',
                    sortType: 'basic',
                    Filter: columnFilter
                },
                {
                    Header: 'Created at',
                    accessor: 'column6',
                    sortType: 'basic',
                    Filter: columnFilter
                },
                {
                    Header: 'Delete',
                    accessor: 'column7',
                    sortType: 'basic',
                    Filter: columnFilter,
                
                },

            ],
            []
        );

        return columns;
    }

    function createTableDate() {
        return React.useMemo(() => columnsArray, [columnsArray]);
    }

    function createTable(columns, data) {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
        } = useTable({ columns, data }, useFilters, useSortBy);

        let uniqueListkey = 0;
        const table =
            <div className="container">
                <div className="row justify-content-md-center">
                    <table
                        {...getTableProps()}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr key={uniqueListkey++}{...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            key={uniqueListkey++}
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                        >
                                            {column.render('Header')}
                                            <span
                                                style={{ position: 'relative', left: '15px' }}
                                                role="img"
                                                aria-label="up and down arrows"
                                            >
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '🟦'}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            {/* separating between filtering and sort (toggling) */}
                            {headerGroups.map(headerGroup => (
                                <tr key={uniqueListkey++}{...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={uniqueListkey++}>
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody
                            {...getTableBodyProps()}
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            {rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr key={uniqueListkey++}{...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <td
                                                    key={uniqueListkey++}
                                                    {...cell.getCellProps()}
                                                    style={{
                                                        padding: '10px 15px',
                                                        border: 'solid 1px gray',
                                                    }}
                                                >
                                                    {cell.render('Cell')}
                                                    
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>;

        return table;
    }

    function columnFilter({ column }) {
        const { filterValue, setFilter } = column;
        return (
            <span>
                <input
                    placeholder='filter'
                    value={filterValue || ''}
                    onChange={(event) => setFilter(event.target.value)}
                    style={{ textAlign: 'center' }}
                />
            </span>
        );
    };

    function createAlternativeDisplay() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">;
                    <div>No assessments data available.</div>
                </div>
            </div>
        );
    }
}