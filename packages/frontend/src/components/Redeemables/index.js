import './Redeemables.css';

const Redeemables = ({ data }) => {

  const RenderData = () => {
    if (!data.length) {
      return <span>Not Available..</span>
    }
    return (
      <ul>
        <li className="address"><span ><strong>Name</strong></span> <strong>Address</strong></li>
        {
          data.map(r => (
            <li key={r.id}>
              <span className="address">{r.name}</span>
              {r.signerAddress}
            </li>
          ))
        }
      </ul >)
  }
  return <div className="Redeemables">
    <h3>Vouchers available to Redeem📝</h3>
    <RenderData />
  </div>
}

export default Redeemables;