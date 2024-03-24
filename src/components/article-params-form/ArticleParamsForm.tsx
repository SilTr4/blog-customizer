import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
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
	OptionType,
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
	const [isOpen, setIsOpen] = useState(false);
	const formElement = useRef<HTMLElement | null>(null);

	const onChange = () => {
		setIsOpen((prevState) => !prevState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formElement,
		onChange: setIsOpen,
	});

	const [selectedRadio, setSelectedRadio] = useState<OptionType>(
		state.fontSizeOption
	);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		state.fontFamilyOption
	);

	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		state.fontColor
	);

	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(state.backgroundColor);

	const [selectedWidth, setSelectedWidth] = useState<OptionType>(
		state.contentWidth
	);

	return (
		<>
			<ArrowButton onChange={onChange} state={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={formElement}>
				<form
					className={styles.form}
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={selectedRadio}
						name='font-size'
						onChange={setSelectedRadio}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={selectedWidth}
						onChange={setSelectedWidth}
						options={contentWidthArr}
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
