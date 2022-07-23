import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';

import { checkAndConnectMetamask, createProvider, domain, types } from './blockchain/config';
import Register from './components/Register';
import Redeemables from './components/Redeemables';
import { CREATE_VOUCHER } from './graphql/mutations';
import { GET_REDEEMABLE_VOUCHERS } from './graphql/querries';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {

  const provider = createProvider();
  const signer = provider.getSigner();
  const [voucherInfo, setVoucherInfo] = useState({ name: '', minPrice: 0 });
  const [signature, setSignature] = useState('');

  const [createVoucher] = useMutation(CREATE_VOUCHER, {
    refetchQueries: [{ query: GET_REDEEMABLE_VOUCHERS }]
  });
  const { data } = useQuery(GET_REDEEMABLE_VOUCHERS);
  const { name, minPrice } = voucherInfo;

  const handleOnChangeText = (e) => setVoucherInfo({ ...voucherInfo, [e.target.name]: e.target.value })

  const handleSignTransaction = async (e) => {
    e.preventDefault()
    try {
      await checkAndConnectMetamask()
      const typedSignature = await signer._signTypedData(domain, types, voucherInfo)
      const signerAddress = await signer.getAddress()
      setSignature(typedSignature)
      await createVoucher({
        variables: {
          input: {
            signerAddress,
            name,
            minPrice: parseInt(minPrice),
            signature: typedSignature
          }
        }
      })
      toast('Voucher Created Successfully');
    } catch (error) {
      console.log(error)
      toast(error.message.toString());
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Marketplace</h1>
      </header>
      <section className="App-content">
        <Register
          name={voucherInfo.name}
          minPrice={voucherInfo.minPrice}
          onChange={handleOnChangeText}
          onSubmit={handleSignTransaction}
        />
      </section>
      <section>
        {signature && <><p>Signature Generated: </p>
          <p>{signature}</p></>}
      </section>
      <Redeemables data={data?.redeemableVouchers || []} />
      <ToastContainer hideProgressBar={true} />
    </div>
  )
}
export default App;