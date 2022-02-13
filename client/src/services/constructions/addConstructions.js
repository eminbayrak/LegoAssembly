export const addConstructions = async (construction) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/construction/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(construction),
    })
        .catch(error => {
            window.alert(error);
            return;
        });
    return await data.json();
}