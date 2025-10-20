import { Button, Box, Flex, Text, Card, Grid } from '@obm/ui-components';

export function TestPage() {
  return (
    <Box className="min-h-screen p-4 md:p-8">
      <Box className="max-w-6xl mx-auto">
        <Text variant="body1" weight="bold" className="text-3xl md:text-4xl lg:text-5xl mb-2">
          Responsive UI Components
        </Text>
        <Text variant="body1" color="muted" className="mb-12">
          Resize your browser to see these layouts adapt
        </Text>

        {/* Example 1: Responsive Card Grid */}
        <Box className="mb-16">
          <Text variant="body1" weight="semibold" className="text-2xl mb-4">
            Example 1: Responsive Card Grid
          </Text>
          <Text variant="body1" color="muted" className="mb-6">
            Cards stack on mobile, 2 columns on tablet, 3 columns on desktop
          </Text>

          <Grid cols={1} md={2} lg={3} gap={4}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Card key={num} padding="none">
                <Flex direction="col" className="p-6 h-full">
                  <Text variant="body1" weight="semibold" className="text-lg mb-2">
                    Card {num}
                  </Text>
                  <Text variant="body2" color="muted" className="mb-4">
                    This card adapts to different screen sizes using responsive grid classes.
                  </Text>
                  <Button variant="primary" size="small">
                    Learn More
                  </Button>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* Example 2: Responsive Flex Layout */}
        <Box className="mb-16">
          <Text variant="body1" weight="semibold" className="text-2xl mb-4">
            Example 2: Responsive Flex Layout
          </Text>
          <Text variant="body1" color="muted" className="mb-6">
            Buttons stack on mobile, display inline on tablet and up
          </Text>

          <Card className="p-4 md:p-8 lg:p-12">
            <Text variant="body1" weight="semibold" className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 lg:mb-6">
              Responsive Heading
            </Text>
            <Text variant="body1" color="muted" className="mb-4 md:mb-6 lg:mb-8">
              This card uses responsive padding that increases on larger screens. The buttons
              below stack vertically on mobile and display horizontally on tablet and larger
              screens.
            </Text>

            <Flex direction="col" sm="row" gap={3}>
              <Button variant="primary" size="medium">
                Primary Action
              </Button>
              <Button variant="secondary" size="medium">
                Secondary Action
              </Button>
            </Flex>
          </Card>
        </Box>

        {/* Example 3: Nested Flex Layouts */}
        <Box className="mb-16">
          <Text variant="body1" weight="semibold" className="text-2xl mb-4">
            Example 3: Nested Flex Layouts
          </Text>
          <Text variant="body1" color="muted" className="mb-6">
            Complex responsive layouts using nested Flex components
          </Text>

          <Card className="p-6">
            <Flex direction="col" gap={4}>
              {/* Header */}
              <Flex justify="between" align="center" className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <Text variant="body1" weight="semibold" className="text-xl">Dashboard Stats</Text>
                <Button variant="secondary" size="small">
                  Refresh
                </Button>
              </Flex>

              {/* Stats Grid - stacks on mobile, 3 columns on tablet+ */}
              <Grid cols={1} sm={3} gap={4}>
                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                  <Text variant="body2" color="muted" className="mb-1">
                    Total Users
                  </Text>
                  <Text variant="body1" weight="bold" className="text-2xl">1,234</Text>
                </Card>
                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                  <Text variant="body2" color="muted" className="mb-1">
                    Active Sessions
                  </Text>
                  <Text variant="body1" weight="bold" className="text-2xl">456</Text>
                </Card>
                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                  <Text variant="body2" color="muted" className="mb-1">
                    Revenue
                  </Text>
                  <Text variant="body1" weight="bold" className="text-2xl">$78.9k</Text>
                </Card>
              </Grid>

              {/* Actions - stack on mobile, inline on tablet+ */}
              <Flex direction="col" sm="row" gap={3} justify="end">
                <Button variant="secondary" size="medium">
                  Export Data
                </Button>
                <Button variant="primary" size="medium">
                  View Details
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
