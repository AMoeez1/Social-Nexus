import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Layout from "../Components/Layout";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const Ai_int = () => {
	const [input, setInput] = useState('');
	const [aiRes, setAiRes] = useState([]);
	const [copyStatus, setCopyStatus] = useState(false);
	const [loading, setLoading] = useState(false);

	const genAi = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const AiResponse = async (input) => {
		setLoading(true);
		try {
			const model = genAi.getGenerativeModel({ model: 'gemini-pro' });
			const result = await model.generateContent(input);
			const response = await result.response;
			const text = await response.text();
			const parsed = JSON.parse(JSON.stringify(text));

			setAiRes(prevRes => prevRes.map(res =>
				res.input === input ? { ...res, response: parsed } : res
			));
		} catch (error) {
			console.log('Something went wrong', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (input.trim() === '') return;

		setAiRes(prevRes => [
			...prevRes,
			{ input, response: 'Processing...' }
		]);
		setInput('');
		await AiResponse(input);
	};

	const onCopyText = () => {
		setCopyStatus(true);
		setTimeout(() => setCopyStatus(false), 2000);
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			if (e.shiftKey) {
				return;
			}
			e.preventDefault();  
			handleSubmit(e); 
		}
	};

	return (
		<Layout>
			<form onSubmit={handleSubmit} className="mx-8">
				<div className="flex w-full my-4 fixed" style={{ top: '80vh' }}>
					<TextArea
						placeholder="Ask AI about anything, anytime"
						autoSize={{ minRows: 1, maxRows: 4 }}
						value={input}
						onChange={handleChange}
						onKeyDown={handleEnter}
						className="w-4/6 p-3"
					/>
					<Button 
						htmlType="submit" 
						type="dark"
						className='bg-gray-800 text-white w-1/12 hover:bg-gray-800 h-12 rounded-e-2xl'
						loading={loading}
					>
						Ask AI
					</Button>
				</div>
				<ul className="overflow-x-scroll overflow-y-scroll my-4" style={{ height: '79vh' }}>
					{aiRes.map((res, index) => (
						<li key={index} className="mb-4">
							<div className="flex justify-end">
								<div className="w-fit font-serif rounded-lg bg-gray-800 p-2 text-white">
									<pre className="mx-4">{res.input}</pre>
								</div>
							</div>
							<div className="w-fit flex items-start rounded-lg bg-white p-2 my-2 hover:bg-gray-50">
								<pre className="mx-4 whitespace-pre-wrap font-serif">{res.response}</pre>
								<CopyToClipboard text={res.response} onCopy={onCopyText}>
									<button className="my-1" style={{ fontSize: 10 }}>{copyStatus ? 'Copied' : 'Copy'}</button>
								</CopyToClipboard>
							</div>
						</li>
					))}
				</ul>
			</form>
		</Layout>
	);
};

export default Ai_int;
