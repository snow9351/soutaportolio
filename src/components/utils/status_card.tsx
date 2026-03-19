import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import SmallArrow from './small_arrow';
// import onClickOutside from 'react-onclickoutside';

interface SliderProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className: string;
	name: string;
	value: number;
}

function Slider({ onChange, className, name, value }: SliderProps) {
	return (
		<input
			type="range"
			onChange={onChange}
			className={className}
			name={name}
			min="0"
			max="100"
			value={value}
			step="1"
		/>
	);
}

interface StatusCardProps {
	visible: boolean;
	toggleVisible: () => void;
	lockScreen: () => void;
	shutDown: () => void;
}

export default function StatusCard({ visible, toggleVisible, lockScreen, shutDown }: StatusCardProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [sound_level, setSound_level] = useState(75);
	const [brightness_level, setBrightness_level] = useState(100);


	useEffect(() => {
		const soundLevel = localStorage.getItem('sound-level');
		const brightnessLevel = localStorage.getItem('brightness-level');
		
		if (soundLevel) {
			setSound_level(Number(soundLevel));
		}
		if (brightnessLevel) {
			setBrightness_level(Number(brightnessLevel));
		}

		// Apply initial brightness
		const monitorScreen = document.getElementById('monitor-screen');
		if (monitorScreen) {
			monitorScreen.style.filter = `brightness(${3 / 400 * Number(brightnessLevel || 100) + 0.25})`;
		}
	}, []);

	// Handle click outside to close status card
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				toggleVisible();
			}
		};

		if (visible) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [visible, toggleVisible]);

	const handleBrightness = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setBrightness_level(value);
		localStorage.setItem('brightness-level', value.toString());
		// the function below inside brightness() is derived from a linear equation such that at 0 value of slider brightness still remains 0.25 so that it doesn't turn black.
		const monitorScreen = document.getElementById('monitor-screen');
		if (monitorScreen) {
			monitorScreen.style.filter = `brightness(${3 / 400 * value + 0.25})`; // Using css filter to adjust the brightness in the root div.
		}
	}, []);

	const handleSound = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setSound_level(value);
		localStorage.setItem('sound-level', value.toString());
	}, []);

	return (
		<div
			ref={wrapperRef}
			className={
				'absolute bg-ub-cool-grey rounded-md py-4 top-9 right-3 shadow border border-black/20 status-card' +
				(visible ? ' visible animateShow' : ' invisible')
			}
		>
			{' '}
			{/* Status Card */}
			<div className="absolute w-0 h-0 -top-1 right-6 top-arrow-up" />
			<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 transition-all duration-150 ease-in-out">
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/audio-headphones-symbolic.svg" alt="ubuntu headphone" />
				</div>
				<Slider
					onChange={handleSound}
					className="ubuntu-slider w-2/3"
					value={sound_level}
					name="headphone_range"
				/>
			</div>
			<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 transition-all duration-150 ease-in-out">
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/display-brightness-symbolic.svg" alt="ubuntu brightness" />
				</div>
				<Slider
					onChange={handleBrightness}
					className="ubuntu-slider w-2/3"
					name="brightness_range"
					value={brightness_level}
				/>
			</div>
			<div className="w-64 flex content-center justify-center">
				<div className="w-2/4 border-black/50 border-b my-2 border-solid transition-all duration-150 ease-in-out" />
			</div>
			<div 
				onClick={toggleVisible}
				className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 cursor-pointer transition-all duration-150 ease-in-out"
			>
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/network-wireless-signal-good-symbolic.svg" alt="ubuntu wifi" />
				</div>
				<div className="w-2/3 flex items-center justify-between text-gray-400">
					<span>OnePlus 8 Pro</span>
					<SmallArrow angle="right" />
				</div>
			</div>
			<div 
				onClick={toggleVisible}
				className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 cursor-pointer transition-all duration-150 ease-in-out"
			>
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/bluetooth-symbolic.svg" alt="ubuntu bluetooth" />
				</div>
				<div className="w-2/3 flex items-center justify-between text-gray-400">
					<span>Off</span>
					<SmallArrow angle="right" />
				</div>
			</div>
			<div 
				onClick={toggleVisible}
				className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 cursor-pointer transition-all duration-150 ease-in-out"
			>
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/battery-good-symbolic.svg" alt="ubuntu battery" />
				</div>
				<div className="w-2/3 flex items-center justify-between text-gray-400">
					<span>2:40 Remaining (75%)</span>
					<SmallArrow angle="right" />
				</div>
			</div>
			<div className="w-64 flex content-center justify-center">
				<div className="w-2/4 border-black/50 border-b my-2 border-solid transition-all duration-150 ease-in-out" />
			</div>
			<div
				id="open-settings"
				onClick={toggleVisible}
				className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 cursor-pointer transition-all duration-150 ease-in-out"
			>
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/emblem-system-symbolic.svg" alt="ubuntu settings" />
				</div>
				<div className="w-2/3 flex items-center justify-between">
					<span>Settings</span>
				</div>
			</div>
			<div
				onClick={() => {
					lockScreen();
					toggleVisible();
				}}
				className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 cursor-pointer transition-all duration-150 ease-in-out"
			>
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/changes-prevent-symbolic.svg" alt="ubuntu lock" />
				</div>
				<div className="w-2/3 flex items-center justify-between">
					<span>Lock</span>
				</div>
			</div>
			<div
				onClick={() => {
					shutDown();
					toggleVisible();
				}}
				className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey/20 cursor-pointer transition-all duration-150 ease-in-out"
			>
				<div className="w-8">
					<Image width={16} height={16} src="/images/icons/system-shutdown-symbolic.svg" alt="ubuntu power" />
				</div>
				<div className="w-2/3 flex items-center justify-between">
					<span>Power Off / Log Out</span>
					<SmallArrow angle="right" />
				</div>
			</div>
		</div>
	);
}
