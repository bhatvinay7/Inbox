'use client'
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from 'uuid';
import { FileText, BanknoteX } from 'lucide-react'
import "react-quill-new/dist/quill.snow.css";
import { X, Paperclip, Send, AtSign, CornerDownLeft, Trash2 } from "lucide-react";
import { Button } from "inbox-ui";
import { Input } from "inbox-ui";
import { attachment, file, mail } from 'types'
import { uploadFIleBuffer, uploadFile } from '../../utils/uploadFile'
import { postMail } from "../../utils/postMail"
import useProfile from '../../lib/hooks/usegetUserInfo'
import CreateIndexedDB from '../../lib/Local_Indexed_DB/cleanLocal_DB'
import StoreMail from  '../../lib/Local_Indexed_DB/storeMails'
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill-new");
        return RQ;
    },
    { ssr: false }
);
export default function Compose() {
    const user = useProfile()
    const [attachments, setAttachments] = useState<attachment[]>([])
    const [mail, setMail] = useState<mail>({ to: "", subject: "", body: "" })
    const [open, setOpen] = useState(true);
    const [files, setFiles] = useState<file[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null);
    async function sendMail() {
        try {
            const link: string[] = files?.map((each => each.link))
            const usermail = {
                userId: user.userId,
                from: user.email,
                to: mail.to,
                uuid: uuid(),
                body: mail.body,
                subject: mail.subject,
                date: Date.now().toLocaleString(),
                status: "PROCESSING",
                tag: "",
                uid: "",
                raw: "",
                parentMailId:"",
                gmailLabels: [""],
                attachments: [...link]
            }
            console.log(usermail)
            const response = await postMail(usermail)
            await StoreMail(response)
        }
        catch (error: any) {
        }
    }
    useEffect(() => {
  async function createDB() {
    try {
      await CreateIndexedDB();
    } catch (error) {
      console.error("Failed to create IndexedDB:", error);
    }
  }
  createDB();
}, []);

    async function handleFileChange(e) {
        try {
            const uuid = uuid() as string
            setFiles((priv) => ([...priv, { uuid: uuid, link: "", isLoading: true, error: false }]))
            const response = await uploadFIleBuffer(uuid, e.target.files?.[0] as File)
            const res = await uploadFile(uuid, response.filePath)
            setFiles(prev =>
                prev.map(f =>
                    f.uuid === uuid
                        ? { ...f, link: res.message, isLoading: false }
                        : f
                )
            );
        }
        catch (error: any) {
            setFiles(prev =>
                prev.map(f =>
                    f.uuid === uuid
                        ? { ...f, isLoading: false, error: true }
                        : f
                )
            );
        }
    }
    function handleDeleate(uuid: string) {
        setFiles(prev =>
            prev.filter(f =>
                f.uuid != uuid)
        );
    }
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
    };
    if (!open) return null;
    return (
        <div className='w-full h-screen fixed inset-0 flex items-center justify-center z-46 bg-black/20 '>
            <div className=" w-[90%^] relative h-[calc(95%)] bg-slate-50 sm:w-[75%] border border-black/35  p-4   rounded-xl sm:p-20">
                <div className=" absolute cursor-pointer right-4 top-4 ">
                    < X className="w-5 h-5 text-black " />
                </div>
                <div className='h-full relative  w-full '>
                    <div className="bg-white rounded-xl  relative h-full w-full  border border-black/20 overflow-hidden flex flex-col">
                        {/* To / Subject */}
                        <div className="p-4 space-y-3">
                            <div className="flex gap-3 items-center">
                                <label className="text-sm w-16 text-gray-600">To</label>
                                <Input value={mail.to} onChange={(e) => setMail(priv => ({ ...priv, to: e.target.value }))} className=" w-full sm:w-1/2 outline-0 border border-black/25 text-black bg-gray-50 rounded px-3 py-2 text-sm" />
                                <Button variant="ghost" className="h-8"> <AtSign className="h-4 w-4" /> </Button>
                            </div>

                            <div className="flex gap-3 items-center">
                                <label className="text-sm w-16 text-gray-600">Subject</label>
                                <Input value={mail.subject} onChange={(e) => setMail(priv => ({ ...priv, subject: e.target.value }))} className="w-full sm:w-1/2  outline-0 border border-black/25   text-black bg-gray-50  rounded px-3 py-2 text-sm" />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="p-4 h-auto">
                            <ReactQuill value={mail.body as string} onChange={(content) => setMail(priv => ({ ...priv, body: content }))} modules={modules} className=" min-h-40 border border-black/20 rounded-md text-black bg-white" />
                        </div>

                        {/* Attachments preview + actions */}
                        <div className="px-4 pb-4 relative pt-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Input ref={fileInputRef} single onChange={handleFileChange} type="file" className="hidden" />
                                    <Button onClick={(e) => fileInputRef.current?.click()} className="flex items-center gap-2 text-sm text-gray-700 
                               hover:text-black">
                                        <Paperclip className="h-4 w-4" /> Attach
                                    </Button >

                                    {/* Example preview using uploaded local path (will be transformed by the platform) */}
                                    <div className="flex justify-center flex-col gap-2 ml-2">
                                        {files?.map((each: file) => {
                                            return (
                                                <div key={each.uuid} className="w-fit flex gap-x-0.5 items-center p-1.5 ">
                                                    <div className="w-fit p-2 bg-red-300/75 rounded-md">
                                                        <FileText className="w-5 h-5 text-red-300" />
                                                    </div>
                                                    {each.error && <BanknoteX className="text-red-400 " />}

                                                    <Button onClick={() => { handleDeleate(each.uuid) }} className="ml-3 text-gray-500 hover:text-red-600">
                                                        <Trash2 className="h-4 w-4" /> </Button >
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer quick actions */}

                        <div className="flex items-center absolute  right-2 bottom-4 gap-2">
                            <Button variant="ghost" onClick={() => setOpen(false)} className=" w-fit bg-black/75 cursor-pointer  px-4">
                                Cancel
                            </Button>
                            <Button onClick={() => sendMail()} className=" w-fit flex px-4 cursor-pointer bg-blue-600/75">
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
