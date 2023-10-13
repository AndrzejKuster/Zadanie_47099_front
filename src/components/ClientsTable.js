import './ClientsTable.css'

const ClientsTable = ({ clients, deleteClient, ...rest }) => {

    return (
        <table {...rest}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nazwa firmy</th>
                    <th>Adres</th>
                    <th>NIP</th>
                    <th>Edycja firmy</th>
                    <th>Usuwanie</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((row, index) => {
                    return (
                        <tr key={row._id}>
                            <td>{index}</td>
                            <td>{row.name}</td>
                            <td>{row.address}</td>
                            <td>{row.NIP}</td>
                            <td>
                                <button onClick={() => {deleteClient(row._id)}} className='edit'>Edytuj</button>
                            </td>
                            <td>
                                <button onClick={() => {deleteClient(row._id)}} className='delete'>Usuń</button>
                            </td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    )
}

export default ClientsTable