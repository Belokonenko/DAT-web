export default async function getDataCards(url) {
    console.log('getDataCards')
    try {
        const res = await fetch(url);

        if (res.ok) {
            const resjson = await res.json()
            console.log(resjson)
            return resjson;
        } else {
            throw new Error(`Error getDataCards ${res.status}`)
        }

    } catch (error) {
        console.error(error)
    }
}
