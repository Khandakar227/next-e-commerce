import { auth, db, firebase } from "../config/firebase";

const addAddress = ({ title, city, region, zipcode, full_address }) => {
  db.collection("Addresses")
    .add({
      user_id: auth.currentUser.uid,
      title,
      city,
      region,
      zipcode,
      full_address,
    })
    .finally(() => window.location.reload(false)); // reload page
};

const updateAddress = ({ address_id, title, city, region, zipcode, full_address }) => {
  console.log({address_id, title, city, region, zipcode, full_address});

  return db.collection("Addresses").doc(address_id).update({
    title,
    city,
    region,
    zipcode,
    full_address,
  });
};

const deleteAddress = async ({ address_id }) => {
  await db
    .collection("Addresses")
    .doc(address_id)
    .delete()
    .finally(() => window.location.reload(false)); // reload page
};

export { addAddress, updateAddress, deleteAddress };
