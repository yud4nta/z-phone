import React, { useContext, useEffect, useState } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdEdit,
  MdWhatsapp,
  MdOutlinePhone,
  MdOutlineSearch,
  MdDelete,
  MdClose,
  MdOutlineMessage,
  MdKeyboardBackspace 
} from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import LoadingComponent from "./LoadingComponent";
import { searchByKeyValueContains } from "../utils/common";
import axios from "axios";
import { MENU_START_CALL_NOTIFICATION } from "./../constant/menu";

const ContactComponent = ({ isShow }) => {
  const {
    resolution,
    contacts,
    contactsBk,
    setMenu,
    setContacts,
    setContactsBk,
    setChatting,
    profile,
  } = useContext(MenuContext);
  const [selected, setSelected] = useState(null);
  const [formEdit, setFormEdit] = useState(null);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setFormEdit({
      ...formEdit,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formEdit) {
      return;
    }
    if (!formEdit.name) {
      return;
    }

    await axios
      .post("/update-contact", {
        name: formEdit.name,
        contact_citizenid: formEdit.contact_citizenid,
      })
      .then(function (response) {
        if (response.data) {
          const newContacts = contacts.map((obj) => {
            return {
              ...obj,
              name: formEdit.name,
            };
          });
          setContacts(newContacts);
          setContactsBk(newContacts);
          setFormEdit(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    // Here you can add your code to send formData to an API
  };
  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white ${
          formEdit ? "visible" : "invisible"
        }`}
        style={{
          height: resolution.layoutHeight,
          width: resolution.layoutWidth,
          backgroundColor: "black",
        }}
      >
        <div className="absolute top-0 flex w-full justify-between py-2 pt-8 z-10">
            <div className="flex items-center px-2 text-blue-500 cursor-pointer" onClick={() => setFormEdit(null)}>
              <MdArrowBackIosNew className="text-lg" />
              <span className="text-xs">Back</span>
            </div>
            <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
              Edit Contact
            </span>
            <div className="flex items-center space-x-1 px-2 group text-red-600 hover:text-red-600">
                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 Delete
               </span>
              <MdDelete
                className="text-xl"
                onClick={async () => {
                  await axios
                    .post("/delete-contact", {
                      contact_citizenid: v.contact_citizenid,
                    })
                    .then(function (response) {
                      if (response.data) {
                        const newContacts = contacts.filter(
                          (item) =>
                            item.contact_citizenid !== v.contact_citizenid
                        );
                        setContacts(newContacts);
                        setContactsBk(newContacts);
                        setSelected(null);
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                    .finally(function () {});
                }}
              />
            </div>
        </div>
        
        <div 
          className="flex flex-col h-full w-full pt-8 space-y-2 px-2"
          style={{
            paddingTop: 60,
          }}
        >
          <form onSubmit={handleEditSubmit} className="grid gap-2">
            <div>
              <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input 
                id="name" 
                className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg block w-full p-2 outline-none"
                name="name"
                value={formEdit?.name}
                placeholder="John"
                onChange={handleEdit}
                autoComplete="off"
                required
               />
            </div>
            <div>
              <label for="number" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Number</label>
              <input 
                id="number" 
                className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg block w-full p-2 outline-none"
                value={formEdit?.phone_number}
              />
            </div>
            <button
                className="flex font-medium rounded-full text-white bg-blue-500 px-3 py-2 text-sm items-center justify-center mt-2"
                type="submit"
            >
              <span>SAVE</span>
            </button>
          </form>

          {/* <div className="rounded-lg py-2 flex flex-col w-full h-full">
            <div className="flex justify-between items-center pb-2">
              <span className="truncate font-semibold">Update Contact</span>
              <div>
                <MdClose
                  className="text-2xl cursor-pointer text-white hover:text-red-500"
                  onClick={() => setFormEdit(null)}
                />
              </div>
            </div>
            <form onSubmit={handleEditSubmit} className="w-full">
              <div className="flex flex-col gap-1 py-2 text-xs">
                <span className="flex justify-between items-center text-sm">
                  <span>Name:</span>
                  <span>
                    <input
                      name="name"
                      value={formEdit?.name}
                      className="border-b w-full font-medium focus:outline-none bg-slate-700"
                      placeholder="John"
                      onChange={handleEdit}
                      autoComplete="off"
                      required
                    />
                  </span>
                </span>
                <span className="flex justify-between items-center text-sm">
                  <span>Phone:</span>
                  <span>{formEdit?.phone_number}</span>
                </span>
                <span className="flex justify-between items-center text-sm">
                  <span>Add at:</span>
                  <span>{formEdit?.add_at}</span>
                </span>
                <div className="flex justify-end pt-2">
                  <button
                    className="flex font-medium rounded-full text-white bg-blue-500 px-3 py-1 text-sm items-center justify-center"
                    type="submit"
                  >
                    <span>SAVE</span>
                  </button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      </div>

      <div className="absolute top-0 flex w-full justify-between py-2 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => {
            setMenu(MENU_DEFAULT);
            setSelected(null);
            setFormEdit(null);
            setFormEdit(null);
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Contact
        </span>
        <div
          className="flex items-center space-x-1 px-2 group text-white hover:text-green-300"
          onClick={async () => {
            let result = null;
            try {
              const response = await axios.post("/share-contact", {});
              result = response.data;
            } catch (error) {
              console.error("error /share-contact", error);
            }
          }}
        >
          <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Share
          </span>
          <FaShare className="text-lg" />
        </div>
      </div>
      {contacts == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto p-2"
          style={{
            paddingTop: 60,
          }}
        >
          <div className="bg-[black] flex items-center w-full pb-3 pt-1">
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="text-sm w-full text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#242426]"
                autoComplete="off"
                onKeyUp={(e) => {
                  const data = searchByKeyValueContains(
                    contactsBk,
                    "name",
                    e.target.value
                  );
                  setContacts(data);
                }}
              />
            </div>
          </div>
          {contacts.map((v, i) => {
            return (
              <div
                className=" flex flex-row w-full justify-between items-center py-1.5  mb-2 rounded-xl hover:bg-[#303032]"
                key={i}
              >
                <div
                  className="flex space-x-2 items-center w-full pl-1 cursor-pointer"
                  onClick={() => setFormEdit(v)}
                >
                  <img
                    src={v.avatar}
                    className="w-8 h-8 object-cover rounded-full"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium line-clamp-1">
                    {v.name} 
                    </span>
                    <span className="text-sm text-gray-600">
                      {v.phone_number}
                    </span>
                  </div>
                </div>
                <div
                  className="h-full flex flex-row items-center justify-center"
                >
                  <div
                    className="w-full h-full place-content-center cursor-pointer px-1"
                    onClick={async () => {
                      let result = null;
                      try {
                        const response = await axios.post("/start-call", {
                          from_avatar: profile.avatar,
                          from_phone_number: profile.phone_number,
                          to_phone_number: v.phone_number,
                        });
                        result = response.data;
                      } catch (error) {
                        console.error("error /start-call", error);
                      }
                    }}
                  >
                    <MdOutlinePhone className="hover:text-gray-50  text-lg text-gray-100 m-1" />
                  </div>
                  {/* <div
                    className="border border-gray-800 hover:bg-gray-800 rounded-lg"
                    onClick={async () => {
                      await axios
                        .post("/delete-contact", {
                          contact_citizenid: v.contact_citizenid,
                        })
                        .then(function (response) {
                          if (response.data) {
                            const newContacts = contacts.filter(
                              (item) =>
                                item.contact_citizenid !== v.contact_citizenid
                            );
                            setContacts(newContacts);
                            setContactsBk(newContacts);
                            setSelected(null);
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                        .finally(function () {});
                    }}
                  >
                    <MdDelete className="cursor-pointer text-lg text-red-600 m-1" />
                  </div> */}
                   <div
                    className="w-full h-full place-content-center cursor-pointer px-1"
                    onClick={async () => {
                      await axios
                        .post("/new-or-continue-chat", {
                          to_citizenid: v.contact_citizenid,
                        })
                        .then(function (response) {
                          if (response.data) {
                            setChatting(response.data);
                            setMenu(MENU_MESSAGE_CHATTING);
                            setSelected(null);
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                        .finally(function () {});
                    }}
                  >
                    <MdOutlineMessage className="hover:text-gray-50 cursor-pointer text-lg text-gray-100 m-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ContactComponent;
