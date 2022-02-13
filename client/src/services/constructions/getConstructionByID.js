export const getConstructionByID = async (constructionID) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/construction/${constructionID.toString()}`, {
    });
    if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }
    return await response.json();
}