import AddClientForm from '../components/AddClientForm'

const AddClient = () => {

  return (
    <div>
      <div className='formContainer'>
        <AddClientForm />
      </div>
      <div>
        {/* <ClientsList clients={clients} deleteClient={deleteClient} className="table" /> */}
      </div>
      {/* <div className='tableContainer'>
                <ClientsTable clients={clients} deleteClient={deleteClient} className="table" />
            </div> */}
    </div>
  )
}

export default AddClient;