import './Register.css';

const Register = ({ name, minPrice, onChange, onSubmit }) => {

  return <div className="Container">
    <form onSubmit={onSubmit}>
      <input required={true} placeholder="Enter name here" name='name' value={name} onChange={onChange}></input>
      <input required={true} placeholder="Enter minimum Price(wei)" name='minPrice' type='number' value={minPrice} onChange={onChange}></input>
      <button type="submit" >Register</button>
    </form>
  </div>
}

export default Register;