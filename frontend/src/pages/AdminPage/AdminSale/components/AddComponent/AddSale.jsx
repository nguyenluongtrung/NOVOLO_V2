import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createSale } from '../../../../../features/sales/saleSlice';
import { Spinner } from '../../../../../components';
import './AddSale.css';
import { FaTimes } from 'react-icons/fa';
import { getAllProducts } from '../../../../../features/products/productsSlice';
import { useEffect, useState } from 'react';



export const AddSale = ({ setIsOpenAddSaleForm }) => {
    const dispatch = useDispatch();

    const [selectedProducts, setSelectedProducts] = useState([]);

    const {
        products,
        isError: productError,
        isSuccess: productSuccess,
        isLoading: productLoading,
        message: productMessage,
    } = useSelector((state) => state.products);

    const {
        isLoading: saleLoading,
        isSuccess: saleSuccess,
        isError: saleError,
        message: saleMessage,
    } = useSelector((state) => state.sales);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCloseBtn = () => {
        setIsOpenAddSaleForm(false);
    };

    const onSubmit = async (data) => {
        console.log(data);
        const addSaleData = {
            ...data,
            productIds: selectedProducts.map((product) => product._id),
        };

        if (saleError) {
            toast.error(saleMessage);
        }

        await dispatch(createSale(addSaleData));

        if (saleSuccess) {
            toast.success('Create sale successfully!');
            handleCloseBtn();
        }
    };
    useEffect(() => {
        if (productError) {
            toast.error(productMessage);
        }

        Promise.all([
            dispatch(getAllProducts('')),
        ]).catch((error) => {
            console.error('Error during dispatch:', error);
        });
    }, [dispatch, productError, productMessage]);



    const handleProductDeselect = (productId) => {
        const updatedSelectedProducts = selectedProducts.filter(
            (product) => product._id !== productId
        );
        setSelectedProducts(updatedSelectedProducts);
    };



    if (saleLoading) {
        return <Spinner />;
    }




    return (
        <div>
            <div className="overlay-addSale"></div>
            <div className="content">
                <div className="addSaleForm">
                    <p style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>
                        ADD NEW A SALE
                    </p>
                   
                    <div className="column">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div onClick={() => setIsOpenAddSaleForm(false)} className="close-btn">
                        <FaTimes size={25} />
                    </div>
                            <div className="input-box">

                                <label>
                                    Product <span className="text-danger">*</span>
                                </label>
                                <select size={6}
                                    {...register('productIds')}
                                    multiple 
                                    onChange={(e) => {
                                        const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
                                            option.value
                                        );
                                        setSelectedProducts(
                                            products.filter((product) => selectedOptions.includes(product._id))
                                        );
                                    }}
                                >
                                    {products.map((product) => (
                                        <option key={product._id} value={product._id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='selected-products'>
                                <p>Selected Products:</p>
                                <ul>
                                    {selectedProducts.map((product) => (
                                        <li key={product._id}>
                                            {product.name}{' '}
                                            <button className="delete-btn-pname" onClick={() => handleProductDeselect(product._id)}><FaTimes /></button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="input-box">

                                <label>
                                    Sale Name <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    {...register('promotionName')}
                                    placeholder="Enter Sale name"
                                    required
                                />

                                <label>
                                    Sale Value <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('promotionValue')}
                                    placeholder="Enter value"
                                    required
                                    min="0"
                                />


                            </div>

                            <div className="input-box">
                                <label>
                                    Start Date <span className="text-danger">*</span> &nbsp; &nbsp;
                                </label>
                                <input
                                    type="date"
                                    {...register('startDate')}
                                    placeholder="Set start date"
                                    required
                                />
                                <label>
                                    End Date <span className="text-danger">*</span> &nbsp; &nbsp;
                                </label>
                                <input
                                    type="date"
                                    {...register('endDate')}
                                    placeholder="Set end date"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>
                                    Sale code <span className="text-danger">*</span> &nbsp; &nbsp;
                                    <span className="text-danger" id="error-image"></span>
                                </label>
                                <input
                                    type="text"
                                    {...register('promotionCode')}
                                    placeholder="Enter sale code"
                                    required
                                />
                                <label>
                                    Quantity <span className="text-danger">*</span> &nbsp; &nbsp;
                                    <span className="text-danger" id="error-image"></span>
                                </label>
                                <input
                                    type="number"
                                    {...register('promotionQuantity')}
                                    placeholder="Enter sale code"
                                    required
                                />
                            </div>

                            <button className="submit-sale" type="submit">Submit</button>
                        </form>
                    </div>


                </div>
            </div >
        </div >
    )
}