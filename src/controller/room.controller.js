import roomService from  '../service/roomService'

const fetchAllRooms = async (req, res) => {
    try {
        const data = await roomService.fetchAllRooms()

        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch rooms',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch rooms successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch rooms',
            DT: ''
        })
    }
}

module.exports = {
    fetchAllRooms
}