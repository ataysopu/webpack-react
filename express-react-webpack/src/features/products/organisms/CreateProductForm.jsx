import React from 'react';
import {useDispatch} from "react-redux";
import {productsActions} from "../reducer";
import {Formik} from 'formik';
import * as Yup from "yup";
import styled from "styled-components";
import {useOnClickOutside} from "../../../utils/hooks";

export const CreateProductForm = (props) => {
    const dispatch = useDispatch()
    const ref = React.useRef();
    const createProduct = async (values) => {
        dispatch(productsActions.create.request({
            title: values.productName,
            price: values.productPrice
        }))
        props.handleClosePopup()
    }

    useOnClickOutside(ref, props.handleClosePopup);

    return (
        <PopupWrapper>
            <Popup ref={ref}>
                <Formik
                    initialValues={{productName: '', productPrice: ''}}
                    onSubmit={createProduct}
                    validationSchema={Yup.object().shape({
                        productName: Yup.string()
                            .required("Необходимо указать название продукта"),
                        productPrice: Yup.number()
                            .required("Необходимо указать цену продукта")
                    })}
                >
                    {({handleSubmit, touched, errors, values, handleChange, dirty}) => (
                        <form onSubmit={handleSubmit}>
                            <InputWrapper>
                                <label>Название продукта</label>
                                <StyledInput
                                    name="productName"
                                    id="productName"
                                    type="text"
                                    placeholder="Название продукта"
                                    value={values.productName}
                                    onChange={handleChange}
                                    className={errors.productName && touched.productName && "error"}
                                />
                                {errors.productName && touched.productName && (
                                    <ErrorText>{errors.productName}</ErrorText>
                                )}
                            </InputWrapper>
                            <InputWrapper>
                                <label>Цена продукта</label>
                                <StyledInput
                                    name="productPrice"
                                    id="productPrice"
                                    type="text"
                                    placeholder="Цена продукта"
                                    value={values.productPrice}
                                    onChange={handleChange}
                                    className={errors.productPrice && touched.productPrice && "error"}
                                />
                                {errors.productPrice && touched.productPrice && (
                                    <ErrorText>{errors.productPrice}</ErrorText>
                                )}
                            </InputWrapper>
                            <button type="submit">
                                Добавить товар
                            </button>
                            <button onClick={props.handleClosePopup}>
                                Отмена
                            </button>
                        </form>
                    )}
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
const ErrorText = styled.div`
  color: red;
  margin-top: .25rem;
`
const StyledInput = styled.input`
  border-color: ${props => props.className?.includes('error') && "red"};
`