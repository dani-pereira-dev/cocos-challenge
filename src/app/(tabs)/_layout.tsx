import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@ui-kit/foundations/colors';
import { copy } from '@/constants/copy';
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
            title: copy.market.tabLabel,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: copy.portfolio.tabLabel,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={focused ? 'briefcase' : 'briefcase-outline'} focused={focused} />
            ),
          }}
        />
      </Tabs>
      <OrderModal />
    </>
  );
}
