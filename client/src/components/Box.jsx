import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../ItemTypes";
import { addToConstruction } from '../services/constructions/addToConstruction'

const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move"
};
const Box = ({ name, index }) => {
    const [counters, setCounters] = React.useState([0, 0, 0, 0, 0]);
    const sum = counters.reduce((acc, item) => acc + item, 0);
    
    const onDropped = (constructionID) => {
        const constructionData = {
            part_a: counters[0],
            part_b: counters[1],
            part_c: counters[2],
            total_count: sum,
        }
        addToConstruction(constructionID, constructionData)
    }
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                const countersCopy = [...counters];
                countersCopy[index] += 1;
                setCounters(countersCopy);
                onDropped(dropResult.name)
                console.log(`You dropped ${item.name} into ${dropResult.name}`);
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0.4 : 1;
    return (
        <div ref={drag} style={{ ...style, opacity }}>
            {name}
        </div>
    );
};
export default Box;
