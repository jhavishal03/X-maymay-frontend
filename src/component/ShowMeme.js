import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import { Button, Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 450,
    margin:20
  },
  main : {
margin: "0px 22px"
  },
  head: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ShowMeme() {
  
  const [showUpdate, setShowUpdate] = useState(false);
  const [memedata, setmemeData] = useState([]);
  const [id,setId] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const updatePost = (id) => {
    setShowUpdate(true);
    setId(id)
    console.log(id);
  };

  const handleClose = () => {
    setShowUpdate(false);
  };
  let history=useHistory();
  const onSubmit = (data) => {
    console.log(data);
    setShowUpdate(false);
    axios.patch(`https://x-maymay.herokuapp.com/memes/${id}`, data).then((res) => {
      console.log(res);
    });
    setId(null);
    history.push("/")
  };

  const classes = useStyles();
  useEffect(() => {
    axios
      .get("https://x-maymay.herokuapp.com/memes")
      .then((res) => setmemeData(res.data));
  }, [id]);
  // console.log(memedata);
  return (
    <div className={classes.main}>
      {memedata.map((meme) => {
        return (
          <Card key={meme.id} className={classes.root}>
            <CardHeader
              className={classes.head}
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {meme.name.slice(0, 1)}
                </Avatar>
              }
              title={meme.name}
            />
            {/* {meme.name} </CardHeader> */}
            <span>{meme.caption}</span>
            <CardMedia 
          
            alt="meme"
            className={classes.media}
            size='fit'
            image={meme.memeurl}
            // title="Memes"
            
            />
            <Button style={{margin:10}} variant="contained" color="primary" onClick={()=>updatePost(meme.id)}>
              Edit
            </Button>
          </Card>
        );
      })}
      <Modal open={showUpdate} className={classes.modal} onClose={handleClose}>
        <div className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={memedata[memedata.length-id]?.memeurl} required name="memeurl" placeholder="enter url" ref={register} />
            <input
            defaultValue={memedata[memedata.length-id]?.caption}
            required
              name="caption"
              placeholder="Enter Caption"
              ref={register({ required: true })}
            />

            {errors.exampleRequired && <p>This field is required</p>}
            <input type="submit" />
          </form>
        </div>
      </Modal>
    </div>
  );
}
