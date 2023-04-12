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

// ** Utils
import { getWithExpiry } from 'src/@core/layouts/utils'
import { isExpired, decodeToken } from 'react-jwt'

// ** Styled Components




const UsersPage = () => {
    // ** Create dafualt Data [{},{},...]
    const createData = (user_ID, user_name, user_email, user_active) => {
        return { user_ID, user_name, user_email, user_active }
    }
    const initialUser = [createData(1,'SuperAdmin', 'Root', 'root@email.com', false)];
    const [usersList, updateUserList] = useState(initialUser);

    const clickEditUser = event => {
        event.preventDefault();
    }
    
    const downEditUser = event => {
        event.preventDefault();
    }
    // ** Fetch
    const [access_token, user_id, userAuthenticated] = useState([]);

    const fetchUsers = () =>{
        getFetchUsers(
            `${process.env.REACT_APP_APIURL}/api/users`,
            {user_ID: user_id, access_token: access_token}
        ).then((response)=>{
            updateUserList(response)
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function getFetchUsers(url="",data = {}) {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'user_id': data.user_ID,
                'access_token': data.access_token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })

        return response.json();
    }
    
    // Check Authenticity of access token and user_Id 
    useEffect(() => {
        access_token = localStorage.getItem('accessToken');
        user_id = getWithExpiry('user_ID');

        const myDecodeToken = decodeToken(access_token);
        if(myDecodeToken.user_ID == user_id){
            userAuthenticated = true;
        }else{
            userAuthenticated = false;
        }
    },[]);
    
    // IF Authenticated in order trigger Fetch
    useEffect(() => {
        if(userAuthenticated){
            fetchUsers();
            console.log('User authenticated');
        }
    },[userAuthenticated]);


    return (
        <Box className='content-center'>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Users' />
                    <TableContainer component={ Paper }>
                        <Table sx= {{ minWidth: 650 }} aria-label='Users Table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell> # </TableCell>
                                    <TableCell> User ID </TableCell>
                                    <TableCell> Name </TableCell>
                                    <TableCell> Email </TableCell>
                                    <TableCell> Active </TableCell>
                                    <TableCell> Update/Delete </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {usersList.map(row => (
                                <TableRow 
                                    key = {row.user_id}
                                    sx = {{'&:last-of-type, &:last-of-type th':{
                                        border: 0
                                    }
                                }}
                                >
                                    <TableCell> {row.id} </TableCell>
                                    <TableCell component='th' scope='row'> {row.user_ID} </TableCell>
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