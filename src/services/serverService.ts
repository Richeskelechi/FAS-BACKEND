
export const getServerhealth = async() =>{
    try {
        return {
            status: 200,
            message: 'Healthy Fedok 12 server',
            data: null,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get Fun Number Data',
            data: err.message,
        }
    }
}