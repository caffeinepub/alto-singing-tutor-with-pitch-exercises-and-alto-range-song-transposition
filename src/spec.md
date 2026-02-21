# Specification

## Summary
**Goal:** Deploy the Brainrot Math application to the Internet Computer mainnet network.

**Planned changes:**
- Deploy both backend and frontend canisters to mainnet using `dfx deploy --network ic`
- Verify mainnet frontend successfully connects to mainnet backend and loads all application data
- Verify Internet Identity authentication works correctly on mainnet
- Verify all static assets including brainrot-themed images are accessible from mainnet
- Configure production canister settings with sufficient cycles allocation

**User-visible outcome:** The application will be accessible on the Internet Computer mainnet at a public URL, allowing anyone to browse lessons, practice math problems with brainrot-themed content, authenticate with Internet Identity, and track their progress.
