import fetchStopList from '@/helpers/fetchStopList';
import { GetStopsReponse, StopPoint } from '@/types/getStopsResponse';
import { Autocomplete, Box, Card, Code, Flex, Text } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { StringInputProps } from 'sanity';

export type Option = {
	title: string;
	value: string;
};

export default function StopListAutocomplete(props: StringInputProps) {
	const [stopList, setStopList] = useState<Option[] | null>(null);

	useEffect(() => {
		fetchStopList().then((response) => {
			if (response) {
				setStopList(response);
			}
		});
	}, []);

	return (
		<Card>
			<Autocomplete
				// openButton
				id={props.id}
				options={stopList?.map((stop) => ({ title: stop.title, value: stop.value }))}
				value={props.value}
				filterOption={(query, option) =>
					query.length < 4
						? false
						: option.title.toLowerCase().replaceAll('&', 'and')?.includes(query.toLowerCase().replaceAll('&', 'and')) ||
							option.value.toLowerCase().includes(query.toLowerCase())
				}
				renderOption={(option) => (
					<Card as="button">
						<Box padding={2} paddingLeft={1}>
							<Flex align="center" dir="row">
								<Text size={[2, 2, 3]}>{option.title}</Text>
								<Box flex={2} />
								<Code size={[1, 1, 2]}>{option.value}</Code>
							</Flex>
						</Box>
					</Card>
				)}
				placeholder="Search for a stop..."
			></Autocomplete>
		</Card>
	);
}
