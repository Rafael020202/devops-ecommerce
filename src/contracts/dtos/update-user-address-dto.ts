export type UpdateUserAddressDTO = {
  user_id: string;
  address: {
    city: string;
    country: string;
    number: number;
    state: string;
    street: string;
    zipcode: string;
  };
};
