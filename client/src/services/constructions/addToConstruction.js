export const addToConstruction = async (constructionID, construction) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/construction/${constructionID.toString()}`, {
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