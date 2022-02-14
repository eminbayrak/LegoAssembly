import React from "react";
import Construction from "../components/Construction";
import Box from "../components/Box";
import Button from "@material-ui/core/Button";
import { getParts } from "../services/parts/getParts";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        
    },
    button: {
        maxWidth: '54px', 
        maxHeight: '54px', 
        minWidth: '54px', 
        minHeight: '54px',
    }
}));

export default function Main() {
    const [parts, setParts] = React.useState([]);
    const [construction, setConstruction] = React.useState([]);
    const [constructionName, setConstructionName] = React.useState('');
    const classes = useStyles();
    // Adding construction(s)
    const addConstruction = () => {
        setConstruction([...construction, <Construction name={constructionName} />]);
        setConstructionName('');
    }

    function updateInputValue(value) {
        return setConstructionName(value);
    }

    // Getting the parts from API
    React.useEffect(() => {
        let mounted = true;
        getParts()
            .then(parts => {
                if (mounted) {
                    setParts(parts)
                }
            })
        return () => mounted = false;
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div>
                            {parts.map((part, i) => {
                                return <Box name={part.part_name} index={i} />
                            })}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        <div>
                        <TextField id="name" 
                            label="Construction Name" name
                            variant="outlined"
                            placeholder="Enter a name"
                            value={construction.name}
                            onChange={(e) => updateInputValue(e.target.value)}
                        />
                            <Button onClick={addConstruction} className={classes.button} variant="contained">+</Button>
                        </div>
                        <br/>
                        <div>
                            {construction}
                        </div>
                    </Paper>
                </Grid>

            </Grid>
        </div>

    );
}