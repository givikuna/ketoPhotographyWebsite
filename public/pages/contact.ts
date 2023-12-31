import { Page, OnloadData } from "../../types/types";

const filename: string = "./pages/contact.ts";

export function html(): Page {
    return {
        html: /* HTML */ `
            <div class="contactFormDiv">
                <form
                    action="https://getform.io/f/31c88bef-faa3-495d-a1fd-0a8c8a7f7ad6"
                    method="POST"
                >
                    <label
                        id="first-name-label"
                        class="contact-form-label"
                        for="first-name"
                    >
                        First Name*:
                    </label>
                    <br /><br />
                    <input
                        id="first-name-input"
                        class="contact-form-input"
                        name="first-name"
                        title="First Name"
                    />
                    <br /><br /><br />

                    <label
                        id="middle-name-label"
                        class="contact-form-label"
                        for="middle-name"
                    >
                        Middle Name:
                    </label>
                    <br /><br />
                    <input
                        id="middle-name-input"
                        class="contact-form-input"
                        name="middle-name"
                        title="Middle Name"
                    />
                    <br /><br /><br />

                    <label
                        id="last-name-label"
                        class="contact-form-label"
                        for="last-name"
                    >
                        Last Name*:
                    </label>
                    <br /><br />
                    <input
                        id="last-name-input"
                        class="contact-form-input"
                        name="last-name"
                        title="Last Name"
                    />
                    <br /><br /><br />

                    <label
                        id="email-address-label"
                        class="contact-form-label"
                        for="email-address"
                    >
                        Email Address*:
                    </label>
                    <br /><br />
                    <input
                        id="email-address-input"
                        class="contact-form-input"
                        name="email-address"
                        title="Email Address"
                    />
                    <br /><br /><br />

                    <label
                        id="phone-number-label"
                        class="contact-form-label"
                        for="phone-number"
                    >
                        Phone Number*:
                    </label>
                    <br /><br />
                    <input
                        id="phone-number-input"
                        class="contact-form-input"
                        name="phone-number"
                        title="Phone Number"
                    />
                    <br /><br /><br />

                    <label
                        id="subject-label"
                        class="contact-form-label"
                        for="subject"
                    >
                        Subject*:
                    </label>
                    <br /><br />
                    <input
                        id="subject-input"
                        class="contact-form-input"
                        name="subject"
                        title="Subject"
                    />
                    <br /><br /><br />

                    <label
                        id="message-label"
                        class="contact-form-label"
                        for="message"
                    >
                        Message*:
                    </label>
                    <br /><br />
                    <textarea
                        id="message-input"
                        class="contact-form-large-input"
                        name="message"
                        title="Message"
                    ></textarea>
                    <br /><br /><br />

                    <button
                        type="submit"
                        class="formSubmitButtonClass"
                        id="formSubmitButtonID"
                    >
                        SEND
                    </button>
                </form>
            </div>

            <br /><br /><br />
        `,
        pageName: "contact",
    };
}

// @ts-ignore
export async function onload(data: OnloadData): Promise<void> {
    try {
        //
    } catch (e: unknown) {
        console.error(`Error at onload(data: OnloadData): Promise<void> in ${filename}`, e);
    }
}
