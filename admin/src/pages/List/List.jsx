import { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null); // holds the food id pending deletion

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList(); //fetch new list after deleting item

    if (response.data.success) {
      toast.error("Food Removed");
    } else {
      toast.error("Error");
    }
  };

  const handleConfirmDelete = () => {
    removeFood(itemToDelete);
    setItemToDelete(null); // close modal
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {isLoading ? (
          <div className="admin-loading" role="status">
            <span className="admin-loading-spinner" />
            <p>Loading food items...</p>
          </div>
        ) : (
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p onClick={() => setItemToDelete(item._id)} className="cursor">
                  X
                </p>
              </div>
            );
          })
        )}
      </div>

      <ConfirmModal
        show={itemToDelete !== null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};

export default List;
