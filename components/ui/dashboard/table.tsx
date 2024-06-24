import React from 'react';

interface Campaign {
    id: number;
    name: string;
    impressions: number;
    clicks: number;
    connections: number;
}

interface CampaignTableProps {
    campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
    const totalImpressions = campaigns.reduce((acc, campaign) => acc + campaign.impressions, 0);
    const totalClicks = campaigns.reduce((acc, campaign) => acc + campaign.clicks, 0);
    const totalConnections = campaigns.reduce((acc, campaign) => acc + campaign.connections, 0);

    return (
        <div className="overflow-x-auto">
            <div className="border rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-[200px] p-4 text-left font-medium">Campaign</th>
                            <th className="p-4 text-right font-medium">Impressions</th>
                            <th className="p-4 text-right font-medium">Clicks</th>
                            <th className="p-4 text-right font-medium">Connections</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign, index) => (
                            <tr key={campaign.id} className={`border-t ${index % 2 === 0 ? "bg-muted" : ""}`}>
                                <td className="p-4 font-medium">{campaign.name}</td>
                                <td className="p-4 text-right">{campaign.impressions.toLocaleString()}</td>
                                <td className="p-4 text-right">{campaign.clicks.toLocaleString()}</td>
                                <td className="p-4 text-right">{campaign.connections.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t">
                            <td className="p-4 font-medium">Total</td>
                            <td className="p-4 text-right">{totalImpressions.toLocaleString()}</td>
                            <td className="p-4 text-right">{totalClicks.toLocaleString()}</td>
                            <td className="p-4 text-right">{totalConnections.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default CampaignTable;
