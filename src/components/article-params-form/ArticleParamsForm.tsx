import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

type TArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (params: React.SetStateAction<ArticleStateType>) => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
}: TArticleParamsFormProps) => {
	// popap
	const [isOpen, setIsOpen] = useState(false);
	const formElement = useRef<HTMLDivElement | null>(null);

	const onChange = () => {
		setIsOpen(!isOpen);
	};

	// закрытие из вне
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formElement,
		onChange: setIsOpen,
	});

	// radio
	const radioOptions = fontSizeOptions;
	const [selectedRadio, setSelectedRadio] = useState(state.fontSizeOption);

	// select font
	const selectFontFamilyOptions = fontFamilyOptions;
	const [selectedFont, setSelectedFont] = useState(state.fontFamilyOption);

	// select fontColor
	const selectFontsColorsOptions = fontColors;
	const [selectedFontColor, setSelectedFontColor] = useState(state.fontColor);

	// select backgroundColors
	const selectBackgroundColorsOptions = backgroundColors;
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		state.backgroundColor
	);

	// select width
	const selectWidthOptions = contentWidthArr;
	const [selectedWidth, setSelectedWidth] = useState(state.contentWidth);

	useEffect(() => {
		setSelectedRadio(state.fontSizeOption);
		setSelectedFont(state.fontFamilyOption);
		setSelectedFontColor(state.fontColor);
		setSelectedBackgroundColor(state.backgroundColor);
		setSelectedWidth(state.contentWidth);
	}, [state]);

	return (
		<>
			<ArrowButton onChange={onChange} state={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={formElement}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setState({
							...state,
							fontFamilyOption: selectedFont,
							fontColor: selectedFontColor,
							backgroundColor: selectedBackgroundColor,
							contentWidth: selectedWidth,
							fontSizeOption: selectedRadio,
						});
					}}>
					<Text as='h1' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={selectFontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={selectedRadio}
						name='font-size'
						onChange={setSelectedRadio}
						options={radioOptions}
						title='размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={selectFontsColorsOptions}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={selectBackgroundColorsOptions}
						title='цвет фона'
					/>
					<Select
						selected={selectedWidth}
						onChange={setSelectedWidth}
						options={selectWidthOptions}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setState(defaultArticleState);
							}}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
