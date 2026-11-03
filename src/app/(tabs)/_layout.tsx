import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors } from '@ui-kit/foundations/colors';
import { OrderModal } from '@/features/order/components/OrderModal';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  name: IoniconsName;
  focused: boolean;
}

function TabIcon({ name, focused }: TabIconProps) {
  return <Ionicons name={name} size={24} color={focused ? colors.tabActive : colors.tabInactive} />;
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.tabActive,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('portfolio.tabLabel'),
            tabBarIcon: ({ focused }) => (
              <TabIcon name={focused ? 'briefcase' : 'briefcase-outline'} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: t('market.tabLabel'),
            tabBarIcon: ({ focused }) => (
              <TabIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} focused={focused} />
            ),
          }}
        />
      </Tabs>
      <OrderModal />
    </>
  );
}
