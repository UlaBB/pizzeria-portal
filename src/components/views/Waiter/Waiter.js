import React from 'react';
import styles from './Waiter.module.scss';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b0e7e7',
        },
        secondary: {
            main: '#d9d8f9',
        },
    },
});

const rows = [
    { id: 1, tableId: '2', number: '1', name: 'ORDER', status: 'READY', orderTime: '13:00', bill: '200', comments: 'water with citrone' },
    { id: 2, tableId: '1', number: '2', name: 'ORDER', status: 'DELIVERED', orderTime: '09:00', bill: '50', comments: 'none' },
    { id: 3, tableId: '3', number: '3', name: 'ORDER', status: 'DONE', orderTime: '11:30', bill: '40', comments: 'none' },
    { id: 4, tableId: '2', number: '4', name: 'ORDER', status: 'CANCELLED', orderTime: '14:00', bill: '40', comments: 'none' },
    { id: 5, tableId: '2', number: '6', name: 'ORDER', status: 'READY', orderTime: '13:00', bill: '40', comments: 'none' },
    { id: 6, tableId: '3', number: '7', name: 'ORDER', status: 'DONE', orderTime: '18:30', bill: '40', comments: 'without ketchup' },
    { id: 7, tableId: '2', number: '4', name: 'ORDER', status: 'CANCELLED', orderTime: '14:00', bill: '40', comments: 'none' },
    { id: 8, tableId: '2', number: '6', name: 'ORDER', status: 'READY', orderTime: '12:00', bill: '40', comments: 'none' },
    { id: 9, tableId: '3', number: '7', name: 'ORDER', status: 'DONE', orderTime: '18:30', bill: '40', comments: 'none' },

];

const Waiter = () => {
    return (
        <Paper className={styles.component}>
            <h2 style={{ color: "#87869b" }} align="center" fontSize="30">Waiters' dashboard</h2>
            <ThemeProvider theme={theme}>
                <Table>
                    <TableHead style={{ background: '#2a4e4e' }}>
                        <TableRow>
                            <TableCell>
                                <Button variant="contained" color="primary" size="large"  >
                                    <Link to={process.env.PUBLIC_URL + '/waiter/new'} style={{ textDecoration: 'none', color: '#FFFFFF' }} >New Order</Link>
                                </Button> <Button variant="contained" color="secondary" size="large"  >
                                    <Link to={process.env.PUBLIC_URL + '/waiter/new'} style={{ textDecoration: 'none', color: '#FFFFFF' }} >Change Order</Link>
                                </Button>
                            </TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">ORDER NUMBER</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">ORDER TIME</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">TABLE NUMBER</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">TIME</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">BILL (zł)</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">COMMENTS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} style={`${row.status}` === 'READY' ? { background: '#5a596d' } : { background: '#659694' }}>
                                <TableCell align="left">
                                    <Button variant="contained" color="primary" size="small">
                                        <Link to={process.env.PUBLIC_URL + '/waiter/order/123abc'} style={{ textDecoration: 'none', color: '#000000' }}>
                                            {row.name}
                                        </Link>
                                    </Button> {`${row.status}` !== 'DONE' && `${row.status}` !== 'CANCELLED' && `${row.status}` ?
                                        <Button variant="contained" color="secondary" size="small" >
                                            <Link to={process.env.PUBLIC_URL + '/waiter/new'} style={{ textDecoration: 'none', color: '#000000' }}>DETAILS</Link>
                                        </Button>
                                        : (null)} {`${row.status}` === 'READY' ?
                                            <Button variant="contained" color="secondary" size="small">
                                                <Link to={process.env.PUBLIC_URL + '/waiter/new'} style={{ textDecoration: 'none', color: '#000000' }}>CHANGE TO 'DELIVERED'</Link>
                                            </Button>
                                            : (null)}
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFFFFF' }}>{`${row.tableId}`}</TableCell>
                                <TableCell align="center" style={{ color: '#FFFFFF' }}>{`${row.number}`}</TableCell>
                                <TableCell align="center" style={{ color: '#FFFFFF' }}>{`${row.status}`}</TableCell>
                                <TableCell align="center" style={{ color: '#FFFFFF' }}>{`${row.orderTime}`}</TableCell>
                                <TableCell align="center" style={{ color: '#FFFFFF' }}>{`${row.bill}`}</TableCell>
                                <TableCell align="center" style={{ color: '#FFFFFF' }}>{`${row.comments}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter style={{ background: '#2a4e4e' }} >
                        <TableRow>
                            <TableCell>
                                <Button color="primary" variant="contained" size="large" style={{ color: '#000000' }}>LOGOUT</Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button color="primary" variant="contained" size="large" style={{ color: '#000000' }}>TRANSFER TABLE</Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button color="primary" variant="contained" size="large" style={{ color: '#000000' }}>RECEIPTS</Button>
                            </TableCell >
                            <TableCell>
                            </TableCell>
                            <TableCell align="center" style={{ color: '#FFFFFF', fontSize: '13px' }}>TABLE AVERAGE TIME: 32 MIN</TableCell >
                            <TableCell align="center">
                                <Button color="secondary" variant="contained" size="large" style={{ color: '#000000' }}>TIPS</Button>
                            </TableCell>
                            <TableCell align="center">
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </ThemeProvider>
        </Paper>
    );
};

export default Waiter;