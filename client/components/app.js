import * as React from "react";
import Helmet from "react-helmet";
import Builder from "../containers/builder";

const App = (props) => (
    <div>
        <Helmet
            title="mypage.online"
            link={[
                {
                    rel: "prerender",
                    href: "http://localhost:3319/templates/myfanpageapp/index.html"
                },
                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcomponent/testplugin/testplugin.js"
                },
                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/scripts/vendor.js"
                },
                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/src/scripts.js"
                },
                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/testTemplate/assets/js/testTemplate.js"
                },
                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/testTemplate/assets/styles/testTemplate.css"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcomponent/testplugin/testplugin.js",
                    as: "script"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/scripts/vendor.js",
                    as: "script"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/scripts.js",
                    as: "script"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/testTemplate/assets/js/testTemplate.js",
                    as: "script"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/testTemplate/assets/styles/testTemplate.css",
                    as: "style"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp",
                    as: "iframe"
                },

                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/default/assets/js/default.js"
                },
                {
                    rel: "subresource",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/default/assets/styles/default.css"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/default/assets/js/default.js",
                    as: "script"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/default/assets/styles/default.css",
                    as: "style"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/default/cover.jpg",
                    as: "image"
                },
                {
                    rel: "prefetch",
                    href: "http://localhost:3319/templates/myfanpageapp/src/webcontent/views/templates/testTemplate/cover.jpg",
                    as: "image"
                }
            ]}
        />
        <h1>App</h1>
        <Builder className="builder-component"></Builder>
    </div>
);

export default App;
