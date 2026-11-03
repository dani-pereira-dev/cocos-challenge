import { Icon } from '@ui-kit';
import { Pressable, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './MarketSearchBar.styles';

interface MarketSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export function MarketSearchBar({ value, onChangeText, onClear }: MarketSearchBarProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Icon name="search" size={18} color={colors.textTertiary} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={t('market.searchPlaceholder')}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="never"
        />
        {value.length > 0 ? (
          <Pressable onPress={onClear} hitSlop={8}>
            <Icon name="close-circle" size={18} color={colors.textTertiary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
