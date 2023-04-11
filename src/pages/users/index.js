// ** React Imports
import { useState, useEffect } from "react";

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import AccountOff from 'mdi-material-ui/AccountOff'
import AccountEdit from 'mdi-material-ui/AccountEdit'
import AccountArrowUp from 'mdi-material-ui/AccountArrowUp'
import AccountArrowDown from 'mdi-material-ui/AccountArrowDown'
// ** Configs

// ** Layout Import

// ** Demo Imports

// ** Styled Components
const createData = (user_id, user_name, user_email, user_active) => {
    return { user_id, user_name, user_email, user_active }
}

const rows = [
    createData('admin', '펠리페', 'admin@email.com', true),
    createData('SuperAdmin', 'Root', 'rootn@email.com', false)
]

const clickEditUser = event => {
    event.preventDefault();
}

const downEditUser = event => {
    event.preventDefault();
}

const UsersPage = () => {
    return (
        <Box className='content-center'>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Users' />
                    <TableContainer component={ Paper }>
                        <Table sx= {{ minWidth: 650 }} aria-label='Users Table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell> User ID </TableCell>
                                    <TableCell> Name </TableCell>
                                    <TableCell> Email </TableCell>
                                    <TableCell> Active </TableCell>
                                    <TableCell> Update/Delete </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map(row => (
                                <TableRow 
                                    key = {row.user_id}
                                    sx = {{'&:last-of-type, &:last-of-type th':{
                                        border: 0
                                    }
                                }}
                                >
                                    <TableCell component='th' scope='row'> {row.user_id} </TableCell>
                                    <TableCell> {row.user_name} </TableCell>
                                    <TableCell> {row.user_email} </TableCell>
                                    <TableCell 
                                        style={{color: (row.user_active)? '#21c521': '#ff4343'}}
                                    > {(row.user_active)? 'Active': 'Inactive'} </TableCell>
                                    <TableCell>
                                        <IconButton
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={downEditUser}
                                            title='설정'
                                            aria-label='button Modify User'
                                        >
                                            <AccountEdit/> 
                                        </IconButton>
                                        <IconButton style={{color: '#21c521' }}
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={clickEditUser}
                                            title='제공'
                                            aria-label='button Activate User'
                                        >
                                            <AccountArrowUp/>
                                        </IconButton>
                                        <IconButton style={{color: '#ffe421' }}
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={clickEditUser}
                                            title='중지'
                                            aria-label='button Inactivate User'
                                        >
                                            <AccountArrowDown/>
                                        </IconButton>
                                        <IconButton style={{color: '#ff4343' }}
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={downEditUser}
                                            title='삭제'
                                            aria-label='button Delete User'
                                        >
                                            <AccountOff/> 
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Box>
    );
    UsersPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
}

export default UsersPage;