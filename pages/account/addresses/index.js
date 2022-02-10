import React, { useState } from "react";

import AccountSidebar from "@/components/AccountSidebar";
import Layout from "@/components/Layout";
import AddressCard from "@/components/AddressCard";
import AddAddress from "@/components/AddAddress";

import styles from "./address.module.scss";
import { useAuth } from "@/firebase/context";
import { useAddresses } from "hooks/address.hook";
import { useRouter } from "next/router";

export default function Addresses() {
  const [toggleModal, setModal] = useState(false);

  const { user, loading: userLoading } = useAuth();
  const { data, loading } = useAddresses();
  
  if (!user && !userLoading) useRouter().push("/login");

  function addNewAddress () {
    if (user?.emailVerified) {
      setModal(true)
    } else {
      alert("You have not yet verified your email please verify your email")
    }
  }

  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>My Addresses</h1>
        <div className={styles.content}>
          {loading ? (
            <span>Loading...</span>
          ) : data.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>You have not set any address</p>
              <button
                className={styles.addAddress}
                onClick={() => addNewAddress()}
              >
                <p>+</p>Add New Address
              </button>
            </div>
          ) : (
            <div className={styles.addresses}>
              <button
                className={styles.addAddress}
                onClick={() => addNewAddress()}
              >
                <p>+</p>Add New Address
              </button>
              {data?.map((item, i) => {
                return <AddressCard key={`${i}. Address`} data={item} />;
              })}
            </div>
          )}
        </div>
        {toggleModal && <AddAddress closeEvent={() => setModal(false)} />}
      </main>
    </Layout>
  );
}
