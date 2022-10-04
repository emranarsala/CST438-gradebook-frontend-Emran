import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import {BrowserRouter, Switch,  Route, useNavigate} from 'react-router-dom';

class AddAssignment extends React.Component {
    constructor() {
      super()
      this.state = {AssignmentName: null, courseId: null, DueDate: null};
    
    };

    

    addAssignment = (assignment) => {
        const token = Cookies.get('XSRF-TOKEN');

        fetch(`${SERVER_URL}/addAssignment`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token
                },
                body: JSON.stringify(assignment)
            })
            .then(res => {
                if (res.ok) {
                    toast.success("New assignment successfully added", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                } else {
                    toast.error("Error when adding new assignment", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error('Post http status =' + res.status);
                }
            })
            .catch(err => {
                    console.error(err);
                }
            )
    }

    setAssignmentName = (event) => {
        this.setState({AssignmentName: event.target.value});
    }

    setCourseId = (event) => {
        this.setState({courseId: event.target.value});
    }

    setDueDate = (event) => {
        this.setState({DueDate: event.target.value});
    }

    setCancel = () => {
        this.setState({AssignmentName: null, courseId: null, DueDate: null});
    }

    setAdd = (event) => {
        this.addAssignment({assignmentName: this.state.AssignmentName, courseId:this.state.courseId, dueDate:this.state.DueDate})
    }


  
    render() {
        return (
            <div>
                    
                    <h2>Add Assignment</h2>                   
                        <TextField autoFocus label="Course Id" name="courseId" onChange={this.setCourseId}/>
                        <TextField label="Name" name="name" onChange={this.setAssignmentName} />                   
                        <TextField label="Due Date" name="duedate"  onChange={this.setDueDate}/>   
                    <br></br>     
                    <Button id="Add"  component={Link} to={{pathname:'/'}} variant="outlined" style={{margin: 20}} color="primary" onClick= {this.setAdd}>
                        Add Assignment</Button>
                    
                    <Button component={Link} to={{pathname:'/'}} 
                    variant="outlined" color="primary" style={{margin: 10}}>
                    Cancel</Button>
                   
                    
            </div>
        );
    }
}

export default AddAssignment;