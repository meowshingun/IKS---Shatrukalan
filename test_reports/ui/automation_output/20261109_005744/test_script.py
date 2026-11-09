async def run_test(page, output_dir, page_url):
    import traceback

    try:
        await page.set_viewport_size({"width": 1920, "height": 1080})
        await page.goto("https://indian-warfare-2--5wr39jms.preview.emergentagent.com", wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-testid="hero-image"]', timeout=10000)
        print("PASS: hero loaded")
        assert "SHATRU" in await page.locator('[data-testid="main-navigation"]').inner_text()
        assert await page.locator('.marquee').count() == 1
        assert await page.locator('.cursor-aura').count() == 1
        print("PASS: branding, marquee, cursor present")

        hero = page.locator('[data-testid="hero-explore-button"]')
        await hero.scroll_into_view_if_needed(); await hero.click()
        await page.wait_for_timeout(700)
        assert await page.locator('#timeline').is_visible()
        print("PASS: hero CTA reaches timeline")

        chola = page.locator('[data-testid="timeline-era-chola"]')
        await chola.scroll_into_view_if_needed(); await chola.click(); await page.wait_for_timeout(500)
        feature = page.locator('[data-testid="active-era-feature"]')
        assert "Chola Thalassocracy" in await feature.inner_text()
        print("PASS: Chola era switches active content")

        read_more = page.locator('[data-testid="era-read-more-button"]')
        await read_more.scroll_into_view_if_needed(); await read_more.click(); await page.wait_for_timeout(400)
        assert await page.locator('[data-testid="detail-modal"]').is_visible()
        assert "Chola Thalassocracy" in await page.locator('[data-testid="detail-modal"]').inner_text()
        await page.locator('[data-testid="detail-modal-close"]').click(); await page.wait_for_timeout(500)
        assert await page.locator('[data-testid="detail-modal"]').count() == 0
        print("PASS: era detail modal opens and dismisses")

        archive = page.locator('[data-testid="archive-card-01"]')
        await archive.scroll_into_view_if_needed(); await archive.click(); await page.wait_for_timeout(400)
        modal_text = await page.locator('[data-testid="detail-modal"]').inner_text()
        assert "Ancient Indian Armies" in modal_text and "Infantry" in modal_text
        await page.locator('[data-testid="detail-modal-close"]').click(); await page.wait_for_timeout(500)
        print("PASS: archive card modal has title and tags")

        for testid, section in [("nav-timeline-button", "timeline"), ("nav-library-button", "modules"), ("nav-principles-button", "principles")]:
            btn = page.locator(f'[data-testid="{testid}"]'); await btn.scroll_into_view_if_needed(); await btn.click(); await page.wait_for_timeout(500)
            assert await page.locator(f'#{section}').is_visible()
        print("PASS: navigation buttons scroll to all sections")

        pbtn = page.locator('[data-testid="principles-read-button"]'); await pbtn.scroll_into_view_if_needed(); await pbtn.click(); await page.wait_for_timeout(400)
        assert "strategic lens" in (await page.locator('[data-testid="detail-modal"]').inner_text()).lower()
        await page.locator('[data-testid="detail-modal-close"]').click(); await page.wait_for_timeout(500)
        print("PASS: principles modal opens and closes")

        await page.set_viewport_size({"width": 390, "height": 844}); await page.reload(wait_until="networkidle"); await page.wait_for_selector('[data-testid="hero-image"]', timeout=10000)
        dims = await page.evaluate("""() => ({scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth})""")
        assert dims["scrollWidth"] <= dims["clientWidth"] + 1, dims
        await page.locator('[data-testid="mobile-menu-button"]').click(); await page.wait_for_timeout(250)
        assert await page.locator('.nav-links.is-open').is_visible()
        await page.locator('[data-testid="nav-library-button"]').click(); await page.wait_for_timeout(500)
        assert not await page.locator('.nav-links.is-open').is_visible()
        print("PASS: mobile layout has no horizontal overflow and menu navigates/closes")

        error_text = await page.evaluate("""() => { const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]')); return errorElements.map(el => el.textContent).join(', '); }""")
        print("No error messages found on the page" if not error_text else f"Found error message: {error_text}")
        print("RESULT: ALL REQUESTED UI FLOWS PASSED")
    except AssertionError as e:
        print(f"FINDING: assertion failed: {e}")
        raise
    except Exception as e:
        print(f"FINDING: test execution failed: {e}")
        traceback.print_exc()
        raise
