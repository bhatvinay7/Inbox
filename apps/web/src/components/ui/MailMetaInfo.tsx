import React from "react";
import { Lock } from "lucide-react";

export default function MailMetaInfo() {
    return (
        <div className="w-fit bg-white shadow-md border rounded-xl p-5 text-sm space-y-1">
            <p><span className="font-medium w-24 inline-block">from:</span> <span className="font-semibold">The Auth0 Team</span> <span className="text-gray-600">&lt;team@auth0.com&gt;</span></p>

            <p><span className="font-medium w-24 inline-block">reply-to:</span> customeradvocate@okta.com</p>

            <p><span className="font-medium w-24 inline-block">to:</span> bhatvinay74@gmail.com</p>

            <p><span className="font-medium w-24 inline-block">date:</span> 21 Nov 2025, 06:31</p>

            <p><span className="font-medium w-24 inline-block">subject:</span> Your free trial has ended</p>

            <p><span className="font-medium w-24 inline-block">mailed-by:</span> m.auth0.com</p>

            <p><span className="font-medium w-24 inline-block">Signed by:</span> auth0.com</p>

            <p className="flex items-center gap-1">
                <span className="font-medium w-24 inline-block">security:</span>
                <Lock className="h-4 w-4 text-gray-700" />
                <span>Standard encryption (TLS)</span>
                <a href="#" className="text-blue-600 hover:underline ml-1">Learn more</a>
            </p>
        </div>
    );
}
