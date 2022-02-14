import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { addConstructions } from '../services/constructions/addConstructions'
import { getConstructionByID } from '../services/constructions/getConstructionByID'
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: "center",
        color: theme.palette.text.primary
    }
}));

const Construction = (name) => {
    const [constructionID, setConstructionID] = React.useState('')
    const [construction, setConstruction] = React.useState({});
    const classes = useStyles();

    // TODO: Once be able to get the construction properties, we can pass it here
    const constructionData = {
        name: name,
        part_a: construction.part_a,
        part_b: construction.part_b,
        part_c: construction.part_c,
        total_count: construction.total_count,
        volume: construction.volume
    };


    // TODO: Get the construction properties by ID and pass into the states
    const getConstruction = () => {
        getConstructionByID(constructionID)
            .then(data => {
                setConstruction(data)
            });
    }
    const deleteConstruction = (constructionID) => {
        console.error('deleted')
    }
    React.useEffect(() => {
        let mounted = true;
        addConstructions(constructionData)
            .then(data => {
                if (mounted) {
                    setConstructionID(data.insertedId)
                }
            })
        return () => mounted = false;
    }, []);

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({ name: constructionID }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    const isActive = canDrop && isOver
    return (
        <Card variant="outlined" className={classes.paper}>

            <Button onClick={deleteConstruction} size="small" className={classes.delete} variant="outlined">X</Button>
            <div ref={drop}>
                <p>{name.name}</p>
                <p>A: {constructionData.part_a}, B: {constructionData.part_b}, C: {constructionData.part_c}, #Parts: {constructionData.total_count}, Vol: {constructionData.volume}</p>
                {isActive ? 'Release to drop' : ''}
            </div>
            <Button onClick={getConstruction} size="small" className={classes.delete} variant="outlined">Update The Count</Button>

        </Card>

    )
}
export default Construction
