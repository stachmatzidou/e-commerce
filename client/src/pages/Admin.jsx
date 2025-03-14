import axios from "axios";
import { useState, useEffect } from "react";
import NavbarProfile from "../components/NavbarProfile";
import Footer from "../components/Footer";
import styled from "styled-components";
import ButtonBlue from "../components/ButtonBlue";
import ButtonRed from "../components/ButtonRed";
import ButtonOrange from "../components/ButtonOrange";

import DisplayCreated from "../components/displayCreatedItem";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    width: 30dvw;
    flex-direction: column;
    align-items: flex-start;
    margin-inline: 2rem;
    margin-block: 2rem;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0.4rem 0;
`;

const Input = styled.input`
    width: 15rem;
    height: 20px;
    margin-block: 0.4rem;
    font-size: 1.1rem;
`;

const Select = styled.select`
    width: 15.5rem;
    height: 25px;
    margin-block: 0.4rem;
    font-size: 1.1rem;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const ButtonClear = styled.button`
    width: 10rem;
    margin-block: 0.8rem 0;
    margin-inline: 2rem;
    font-size: 1.2rem;
    background-color: #24a0ed;
    border: 1px solid black;
    border-radius: 5px;
    transition: 0s background-color;
    padding: 0.5em 2em;

    cursor: pointer;
    &:hover {
        background-color: #1183ca;
        transition-delay: 0.1s;
    }
    &:active {
        background-color: #db5f12;
    }
`;

function Admin() {
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [item, setItem] = useState("");
    const [items, setItems] = useState("");
    const navigate = useNavigate();

    // console.log(user);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios
                .post("http://localhost:3636/auth/verify", {
                    token: localStorage.getItem("token"),
                })
                .then(({ data }) => {
                    setUser(data);
                });
        }
        axios.get("http://localhost:3636/items")
        .then(({data}) => {
            setItems(data);
        });
    }, []);

    console.log(user);
    console.log(items);

    function save() {
        axios
            .post("http://localhost:3636/items/", {
                name,
                description,
                category,
                price,
            })
            .then(({ data }) => {
                setItem(data);
            });
    }

    function del(id) {
        if (id) {
            axios.delete("http://localhost:3636/items/" + id);
            window.location.reload(true);
        } else {
            window.location.reload(true);
        }
    }

    function clear() {
        window.location.reload(true);
    }

    return (
        <div>
            <NavbarProfile user={user} />
            <Container>
                <Wrapper>
                    <Label>
                        Name:
                        <Input
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Label>
                    <Label>
                        Description:
                        <Input
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </Label>
                    <Label>
                        Category:
                        <Select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">select option</option>
                            <option value="laptop">Laptop</option>
                            <option value="mobile">Mobile</option>
                            <option value="accessories">Accessories</option>
                        </Select>
                    </Label>
                    <Label>
                        Price:
                        <Input
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </Label>
                    <ButtonClear
                        onClick={() => {
                            save();
                        }}
                    >
                        Add Item
                    </ButtonClear>
                    <ButtonOrange
                        onClick={() => {
                            clear();
                        }}
                    >
                        Clear
                    </ButtonOrange>
                </Wrapper>
                <Wrapper>
                    <DisplayCreated>
                        <p>Name: {item.name}</p>
                        <p>Description: {item.description}</p>
                        <p>Category: {item.category}</p>
                        <p>Price: {item.price}</p>
                        <p>Id: {item._id}</p>
                        <p>Date created: {item.date_added}</p>
                        <ButtonRed onClick={() => del(item._id)}>
                            Delete
                        </ButtonRed>
                    </DisplayCreated>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    );
}

export default Admin;
