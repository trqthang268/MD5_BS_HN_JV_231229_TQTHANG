import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'
import Input from './components/Input';
import Modal from './components/Modal';
import Form from './components/Form';

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs")) || [];

    return jobLocal;
  })

  const countCheckedJobs = jobs.filter(job => job.status === true).length;

  const [job, setJob] = useState({
    id: "",
    name: "",
    status: false,
  });
  const [nameError, setNameError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [jobInfo, setJobInfo] = useState(null);

  /**
   * hàm thêm công việc vào jobs
   */
  const handleAddJob = (e) => {
    e.preventDefault();

    const nameValid = validateDate("name", job.name);
    if (nameValid) {
      const newJob = { ...job, id: Date.now(), status: false };
      const newJobs = [...jobs, newJob];
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      setJobs(newJobs);
    }
  }

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setJob({
     ...job,
      [name]: value,
    });

    validateDate(name, value);
  }
  /**
   * hàm validate dữ liệu
   * @param {*} name tên key càn validate
   * @param {*} value giá trị cần kiểm tra validate
   * @returns trả về đúng sai sau khi set nameError
   */
  const validateDate = (name, value) => {
    let valid = true;
    switch (name) {
      case "name":
        if (!value) {
          setNameError("Tên công việc không được để trống ");
          valid = false;
        } else {
          setNameError("");
        }
        break
      default:
        return valid;
    }
    return valid;
  }
  
  /**
   * hàm cập nhật trạng thái công việc
   * @param {*} id id cần cập nhật
   */
  const handleUpdateStatus = (id) => {
    //tìm vị trí cần cập nhật
    const findIndexJob = jobs.findIndex((job) => job.id === id);
    //đổi trạng thái 
    jobs[findIndexJob].status = !jobs[findIndexJob].status;
    //lưu dữ liệu lên localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));
    const newJobs = [...jobs];
    //cập nhật lại state để component re-render
    setJobs(newJobs);
  }

  //MODAL DELETE
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [baseId, setBaseId] = useState("");
  /**
   * Hàm mở modal xác nhận xóa
   * @param {*} id lấy id cần xóa
   */
  const handleShowModalDelete = (id) => {
    setShowModalDelete(true);
    setBaseId(id);
  };
  /**
   * Hàm đóng modal xác nhận xóa
   */ 
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);

    // Reset lại baseId
    setBaseId("");
  };
  
  /**
   * Hàm xóa công việc theo id
   * @param {*} id  id cần xóa
   */
  const handleDelete = () => { 
    //lọc ra những id khác với id cần xóa
    const filterJobs = jobs.filter((job) => job.id!== baseId);
    //lưu dữ liệu lên localStorage
    localStorage.setItem("jobs", JSON.stringify(filterJobs));
    //cập nhật lại state để component re-render
    const newJobs = [...filterJobs];
    setJobs(newJobs);
    handleCloseModalDelete();
  }

  //MODAL UPDATE
  // Hàm mở form cập nhật và lấy id của cong viec
  const handleUpdate = (job) => {
    setShowForm(true);
    //cập nhật thông tin cho jobInfo
    setJobInfo(job);
  };
  // Hàm đóng form cập nhật
  const handleCloseForm = () => {
    setShowForm(false);
    setJobInfo(null);
  };

  /**
   * hàm cập nhật công việc
   */
  const handleUpdateData = (newData) => {
    setJobs(newData);
   }

  return (
    <>
      <div>
        <div className='flex justify-center items-center mt-[100px]'>
          <div className='border rounded-md shadow-md py-5 px-20 min-w-[-60%]'>
            <h3 className='text-center font-bold text-xl py-6'>Danh sách công việc</h3>
            <form className="flex gap-4" onSubmit={handleAddJob}>
              <Input name="name" value={job?.name} onChange={handleChangeValue} placeholder="Nhập tên công việc" type="text" className="focus:border-blue-700 hover:shadow-md h-9 border outline-none px-4 rounded flex-1"/>
              <button className="h-9 rounded px-4 border bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white">Thêm</button>
            </form>
            {nameError && <p className="text-start py-2 text-red-400 text-sm">{nameError}</p>}
            <ul className="flex flex-col gap-3 mt-5 max-h-72 overflow-y-auto">
              {
                jobs.map((job) => (
                  <li key={job.id} className="flex px-2 rounded justify-between items-center hover:bg-gray-200 cursor-pointer">
                    <div className="flex gap-2 items-center">
                      <input checked={job.status} onChange={()=>handleUpdateStatus(job.id)} type="checkbox" className="h-4 w-4 cursor-pointer" />
                          {job.status ? <s>{job.name}</s> : <span>{job.name}</span>}
                    </div>
                    <div className="flex gap-4">
                      <EditOutlined onClick={()=>handleUpdate(job)} className="cursor-pointer hover:bg-gray-300 p-2 rounded-full text-orange-500"/>
                      <DeleteOutlined onClick={()=>handleShowModalDelete(job.id)} className="cursor-pointer hover:bg-gray-300 p-2 rounded-full text-red-500"/>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="mt-3 bg-gray-100 p-2 rounded">Công việc đã hoàn thành: <b>{countCheckedJobs}</b>/ <b>{jobs.length}</b></div>
          </div>
        </div>
      </div>
      {showModalDelete && (
        <div className="absolute top-40 left-[35%]  w-[490px] border shadow px-6 py-5 bg-white rounded z-20">
          <Modal
            onClose={handleCloseModalDelete}
            onConfirm={handleDelete}
            title="Xác nhận xóa"
            message="Bạn có chắn chắn muốn xóa công việc này không?"
          />
        </div>
      )}
      {/* {showForm && (
        <div className="absolute top-40 left-[35%]  w-[490px] border shadow px-6 py-5 bg-white rounded z-20">
          <Form
            jobInfo={jobInfo}
            onCloseForm={handleCloseForm}
            onLoadData={handleUpdateData}
          />
        </div>
      )} */}
    </>
  )
}
