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
    const [partCounts, setPartCounts] = React.useState({
        part_a: 0,
        part_b: 0,
        part_c: 0,
        total_count: 0
    });
    
    const onDropped = (constructionID) => {
        const constructionData = {
            part_a: partCounts.part_a,
            part_b: partCounts.part_b,
            part_c: partCounts.part_c,
            total_count: partCounts.totalCount,
        }
        addToConstruction(constructionID, constructionData)
    }

    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                if (index === 0) {
                    setPartCounts({
                        part_a: partCounts.part_a + 1, 
                        part_b: partCounts.part_b, 
                        part_c: partCounts.part_c, 
                        total_count: partCounts.total_count + 1
                    });
                } 
                if (index === 1) {
                    setPartCounts({
                        part_b: partCounts.part_b + 1,
                        part_a: partCounts.part_a,
                        part_c: partCounts.part_c,
                        total_count: partCounts.total_count + 1
                    })
                }
                if (index === 2) {
                    setPartCounts({
                        part_c: partCounts.part_c + 1, 
                        part_a: partCounts.part_a, 
                        part_b: partCounts.part_b, 
                        total_count: partCounts.total_count + 1
                    })
                }
                
                onDropped(dropResult.name)
                console.log(partCounts)
                // console.log(`You dropped ${item.name} into ${dropResult.name}`);
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
