import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    saveProduct, listProducts, deleteProduct
} from '../actions/productActions';

function ProductsScreen(props) {

    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    //Show list
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    //Create
    const productSave = useSelector((state) => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    //Delete
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    //Modal
    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    };

    //Save and update
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };
    //delete
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };

    return (

        <div>
            <div className="product-header">
                <h3>Products</h3>
                <button onClick={() => openModal({})} className="btn">
                    Create Product</button>
            </div>

            {/* Create product */}
            {modalVisible && (
                <section className="shop checkout section">
                    <div className="container">
                        <div className="checkout-form">
                            <h2>{id ? 'Update Product' : 'Create Product'}</h2>

                            {/* Form */}
                            <form className="form" onSubmit={submitHandler}>
                                <h4>
                                    {loadingSave && <div className="preloader">
                                        <div className="preloader-inner">
                                            <div className="preloader-icon">
                                                <span />
                                                <span />
                                            </div>
                                        </div>
                                    </div>}
                                    {errorSave && <div>{errorSave}</div>}
                                </h4>
                                <div className="row">

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="brand">Brand</label>
                                            <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="countInStock">Count In Stock</label>
                                            <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="description">Category</label>
                                            <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)} ></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-6">
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="btn"> {id ? 'Update' : 'Create'} </button>
                                        <button type="button" onClick={() => setModalVisible(false)} className="btn">CLOSE</button>
                                    </div>
                                </div>
                            </form>
                            {/*/ End Form */}
                        </div>
                    </div>
                </section>
            )}

            {/* Product List */}
            <div className="shopping-cart section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table shopping-summery">
                                <thead>
                                    <tr className="main-hading">
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Count In Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td data-title="ID">{product._id}</td>
                                            <td data-title="NAME">{product.name}</td>
                                            <td data-title="PRICE">{product.price}</td>
                                            <td data-title="CATEGORY">{product.category}</td>
                                            <td data-title="COUNTINSTOCK">{product.countInStock}</td>
                                            <td data-title="ACTION">
                                                <button onClick={() => openModal(product)} className="btn" >
                                                    Edit
                                                </button>{' '}
                                                <button onClick={() => deleteHandler(product)} className="btn" >
                                                    Delete
                                                 </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*/ End Product List */}

        </div>
    );
}
export default ProductsScreen;
