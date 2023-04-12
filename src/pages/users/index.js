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
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import AccountOff from 'mdi-material-ui/AccountOff'
import AccountEdit from 'mdi-material-ui/AccountEdit'
import AccountArrowUp from 'mdi-material-ui/AccountArrowUp'
import AccountArrowDown from 'mdi-material-ui/AccountArrowDown'

// ** Utils
import { getWithExpiry } from 'src/@core/layouts/utils'
import { isExpired, decodeToken } from 'react-jwt'

// ** Styled Components




const UsersPage = () => {

    // ** Dialog Box
    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(false);
    const [dialogAction, setDialogAction] =useState(false);
    const [dialogDescription, setDialogDescription] = useState(false);
    const [btLeftDialog, setBtLeftDialog]   = useState(false);
    const [btRightDialog, setBtRightDialog] = useState(false);

    const handleClickOpen = (action = '', user = 0) => {
        var title, description, btLeft, btRight = '' ;
        switch(action){
            case 'edit': 
                title = 'User Edition'
                description = 'here the user information'
                btLeft = 'Close'
                btRight = 'Save'
                break;
            case 'activate':
                title = 'User Activation'
                description = 'Are you sure to activate the user?'
                btLeft = 'Cancel'
                btRight = 'Activate'
                break;
            case 'deactivate':
                title = 'User Deactivation'
                description = 'Are you sure to deactivate the user?'
                btLeft = 'Cancel'
                btRight = 'Deactivate'
                break;
            case 'delete':
                title = 'Removing User'
                description = 'Are you sure to delete the user?'
                btLeft = 'Cancel'
                btRight = 'Delete'
                break;
            default: break;
        }
        setOpen(true);
        setDialogAction(action);
        setDialogTitle(title);
        setDialogDescription(description);
        setBtLeftDialog(btLeft);
        setBtRightDialog(btRight);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleActionDialog = (event) => {
        event.preventDefault()
        console.log(event.currentTarget.getAttribute('data-action'))
    }

    // ** Create defualt Data [{},{},...]
    const createData = (user_ID, user_name, user_email, user_active) => {
        return { user_ID, user_name, user_email, user_active }
    }
    const initialUser = [createData(1,'SuperAdmin', 'Root', 'root@email.com', false)];
    const [usersList, updateUserList] = useState(initialUser);

    const clickEditUser = event => {
        handleClickOpen(
            event.currentTarget.getAttribute('data-action'),
            event.currentTarget.getAttribute('data-user')
        );
    }
    
    const downEditUser = event => {
        handleClickOpen(
            event.currentTarget.getAttribute('data-action'),
            event.currentTarget.getAttribute('data-user')
        );
    }

    async function postFetchEditUser(url="",data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data
        })

        return response.json();
    }


    // ** Fetch
    const [access_token, user_id, userAuthenticated] = useState([]);
    const fetchUsers = () =>{
        getFetchUsers(
            `${process.env.REACT_APP_APIURL}/api/users`,
            {user_ID: user_id, access_token: access_token}
        ).then((response)=>{
            updateUserList(response)
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
    
    // ** Check Authenticity of access token and user_Id 
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
    
    // ** IF Authenticated in order trigger Fetch
    useEffect(() => {
        if(userAuthenticated){
            fetchUsers();
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
                            {usersList.map((row,listID) => (
                                <TableRow 
                                    key = {listID}
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
                                        style={{color: (row.user_active)? '#21c521': '#ff7321'}}
                                    > {(row.user_active)? 'Active': 'Inactive'} </TableCell>
                                    <TableCell>
                                        <IconButton
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={downEditUser}
                                            title='설정'
                                            aria-label='button Modify User'
                                            data-action='edit'
                                            data-user={row.id}
                                        >
                                            <AccountEdit/> 
                                        </IconButton>
                                        {!row.user_active &&
                                            <IconButton style={{color: '#21c521' }}
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={clickEditUser}
                                            title='제공'
                                            aria-label='button Activate User'
                                            data-action='activate'
                                            data-user={row.id}
                                            >
                                                <AccountArrowUp/>
                                            </IconButton>
                                        }
                                        {row.user_active &&
                                            <IconButton style={{color: '#ff7321' }}
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={clickEditUser}
                                            title='중지'
                                            aria-label='button Inactivate User'
                                            data-action='deactivate'
                                            data-user={row.id}
                                            >
                                                <AccountArrowDown/>
                                            </IconButton>
                                        }
                                        <IconButton style={{color: '#ff4343' }}
                                            edge='end'
                                            onClick={clickEditUser}
                                            onMouseDown={downEditUser}
                                            title='삭제'
                                            aria-label='button Delete User'
                                            data-action='delete'
                                            data-user={row.id}
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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert change on by bt title'
                    aria-describedby='alert change on by bt description'
                >
                    <DialogTitle id="dialog-user-actions">
                        {dialogTitle}
                        <IconButton
                            aria-label='close'
                            onClick={handleClose}
                            sx = {{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-user-description">
                            {dialogDescription}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{btLeftDialog}</Button>
                        <Button 
                          onClick={handleActionDialog}
                          data-action={dialogAction}
                          autoFocus
                        >
                            {btRightDialog}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Box>
    );
    UsersPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
}

export default UsersPage;