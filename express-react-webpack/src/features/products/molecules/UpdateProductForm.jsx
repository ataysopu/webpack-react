import React from 'react';
import styled from 'styled-components'
import {Formik} from 'formik';
import {useOnClickOutside} from "../../../utils/hooks";
import {useProductsQuery} from "../queries/useProductsQuery";


export const UpdateProductForm = (props) => {
    const ref = React.useRef();
    const {update} = useProductsQuery()

    useOnClickOutside(ref, props.handleToggleEditPopup);

    let updateProduct = (values) => {
        update(props.id, values.productName, values.productPrice)
        props.handleToggleEditPopup()
    };

    return (
        <PopupWrapper>
            <Popup ref={ref}>
                <Formik
                    initialValues={{productName: props.name, productPrice: props.price}}
                    onSubmit={updateProduct}
                >
                    {({handleSubmit, values, handleChange, dirty}) => (
                        <form onSubmit={handleSubmit}>
                            <InputWrapper>
                                <label>Название продукта</label>
                                <input
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    placeholder="Product Name"
                                    value={values.productName}
                                    onChange={handleChange}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <label>Цена продукта</label>
                                <input
                                    type="text"
                                    name="productPrice"
                                    id="productPrice"
                                    placeholder="Product price"
                                    value={values.productPrice}
                                    onChange={handleChange}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <button type="submit" disabled={!dirty}>
                                    Сохранить изменения
                                </button>
                                <button onClick={props.handleToggleEditPopup}>
                                    Отмена
                                </button>
                            </InputWrapper>
                        </form>)
                    }
                </Formik>
            </Popup>
        </PopupWrapper>
    )
}

const PopupWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
`
const Popup = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: auto;
  background: white;
`
const InputWrapper = styled.div`
  margin-bottom: 20px;
  & > label {
    display: block;
    font-size: 12px;
    margin-bottom: 5px;
  }
`