'use client'
import { useState } from "react";
import { Mail, Moon, Sun, LogIn } from "lucide-react";
import { Card, CardContent,Button } from "inbox-ui";
import { motion } from "framer-motion";

export default function GoogleSignin({handleLogin}:{handleLogin:()=>void}) {
  const [dark, setDark] = useState(false);
  
  return (
    <div className={`${dark ? "dark" : ""} w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4`}>
      <Card className=" w-full max-w-md shadow-xl rounded-xl bg-white dark:bg-gray-800  p-2 ">
        <CardContent className=" p-4 w-full ">
          <div className=" flex items-center justify-between mb-6 p-2 ">
            <div className="flex items-center gap-2">
              <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">Inbox</h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg">Mail delivery made simple</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Button onClick={()=>{handleLogin()}} className="flex items-center gap-3 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 py-2 rounded-xl">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Sign in with Google</span>
              <LogIn className="w-5 h-5" />
            </Button>
          </motion.div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Secure and fast authentication
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
