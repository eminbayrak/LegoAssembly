
export const getParts = async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/parts`)
        .catch(error => {
            window.alert(error);
            return;
        });
    return await data.json();
}

