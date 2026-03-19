/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';

export default function Gedit() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const userId = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (userId) {
            emailjs.init(userId);
        }
    }, []);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const sendMessage = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);
            setErrorMessage('');
            const trimmedName = name.trim();
            const trimmedEmail = email.trim();
            const trimmedSubject = subject.trim();
            const trimmedMessage = message.trim();
            let hasError = false;
            if (trimmedName.length === 0) {
                setName('');
                setError(true);
                setErrorMessage('Name is required');
                hasError = true;
            }
            if (!isValidEmail(trimmedEmail)) {
                setEmail('');
                setError(true);
                setErrorMessage('Valid email is required');
                hasError = true;
            }
            if (trimmedMessage.length === 0) {
                setMessage('');
                setError(true);
                setErrorMessage('Message is required');
                hasError = true;
            }
            if (hasError) {
                setLoading(false);
                return;
            }

            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            if (!serviceId || !templateId) {
                setError(true);
                setErrorMessage('Service ID or template ID is not set');
                return;
            }
            await emailjs.send(serviceId, templateId, {
                from_name: trimmedName,
                reply_to: trimmedEmail,
                from_subject: trimmedSubject,
                from_message: trimmedMessage,
            });
            setError(false);
            setErrorMessage('Message sent successfully');
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage('Failed to send message');
        } finally {
            setLoading(false);
        }
    }, [name, email, subject, message]);

    return (
        <div className="w-full flex-1 relative flex flex-col bg-ub-cool-grey text-white select-none">
            <div className="flex items-center justify-between w-full bg-ub-gedit-light/60 border-b border-t border-blue-400 text-sm">
                <span className="font-bold ml-2">Send a Message to Souta Hoshino</span>
                <div className="flex">
                    <button
                        onClick={sendMessage}
                        disabled={loading || !name.trim() || !isValidEmail(email.trim()) || !message.trim()}
                        className={
                            (loading || !name.trim() || !isValidEmail(email.trim()) || !message.trim()
                                ? " opacity-50 cursor-not-allowed "
                                : " cursor-pointer hover:bg-black/80 ") +
                            " border border-black bg-black/50 px-3 py-1.5 mx-1 rounded transition-all duration-150 ease-in-out"
                        }
                    >
                        Send
                    </button>
                </div>
            </div>
            {errorMessage && (
                <div
                    className={`${error ? 'bg-red-900/40 border-red-400' : 'bg-green-900/60 border-green-400'} text-sm mt-0.5 pl-2 py-1.5 border-y`}
                >
                    <span className="font-bold mr-3">{error ? 'Warning' : 'Success'}!</span>
                    {errorMessage}
                </div>
            )}
            <div className="relative flex-1 flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
                <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
                <div className="relative">
                    <input
                        id="sender-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className=" w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none font-medium text-sm pl-6 py-0.5 bg-transparent"
                        placeholder="Your Name :"
                        spellCheck="false"
                        autoComplete="off"
                        type="text"
                    />
                    <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold light text-sm text-ubt-gedit-blue">1</span>
                </div>
                <div className="relative">
                    <input
                        id="sender-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=" w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light outline-none text-sm font-normal pl-6 py-0.5 bg-transparent"
                        placeholder="your@email.com"
                        spellCheck="false"
                        autoComplete="email"
                        type="email"
                    />
                    <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold  text-sm text-ubt-gedit-blue">2</span>
                </div>
                <div className="relative">
                    <input
                        id="sender-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className=" w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light gedit-subject outline-none text-sm font-normal pl-6 py-0.5 bg-transparent"
                        placeholder="subject (may be a feedback for this website!)"
                        spellCheck="false"
                        autoComplete="off"
                        type="text"
                    />
                    <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold  text-sm text-ubt-gedit-blue">3</span>
                </div>
                <div className="relative flex-1">
                    <textarea
                        id="sender-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full gedit-message font-light text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent"
                        placeholder="Message"
                        spellCheck="false"
                        autoComplete="none"
                    />
                    <span className="absolute left-1 top-1 font-bold  text-sm text-ubt-gedit-blue">4</span>
                </div>
            </div>
            {loading && (
                <div className="flex justify-center items-center animate-pulse h-full w-full bg-gray-400/30 absolute top-0 left-0">
                    <img className=" w-8 absolute animate-spin" src="/images/icons/process-working-symbolic.svg" alt="Ubuntu Process Symbol" />
                </div>
            )}
        </div>
    );
}
