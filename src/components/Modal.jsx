import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

export default function Modal({
    title,
  message,
  onClose,
  onConfirm,
  cancelText,
  okText,}) {
  return (
      <>
        <div>
          <div className="w-[100] flex">
          <h4>{title || "Tiêu đề"}</h4>
          <CloseOutlined  onClick={onClose} className='ml-[320px]'/>
          </div>
          <div className="flex items-center py-2 gap-3">
            <div className="modal-body-custom">
              <span>{message || "Nội dung thông báo"}</span>
            </div>
          </div>
            <hr className=""/>
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={onClose} className="border px-4 h-9 rounded cursor-pointer hover:bg-[#E0E0E0] focus:bg-[#BDBDBD]">
                {cancelText || "Hủy"}
            </button>
            <button onClick={onConfirm} className="text-white bg-[#007AFF] hover:bg-[#3395FF] focus:bg-[#0062CC] border px-4 h-9 rounded cursor-pointer">
                {okText || "Xác nhận"}
            </button>
          </div>
        </div>

      </>
  )
}

